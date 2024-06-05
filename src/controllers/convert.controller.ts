import { Response, Request } from 'express'
import { ConvertCurrencySchema } from '../validation/convertCurrency.schema'
import { StatusCodes } from '../lib/statusCodes.enum'
import { convertCurrenciesServices } from '../services/convert.services'
import { ErrorMessages } from '../lib/erorrMessages.enum'

const convertRatesController = async (req: Request, res: Response) => {
  const { amount, from, to } = req.query

  if (!amount || !from || !to) {
    return res.status(StatusCodes.BadRequest).json({
      error: ErrorMessages.MissingQueryParameters,
    })
  }

  // Validate query params with zod schema
  const parsedQueryParams = ConvertCurrencySchema.safeParse({
    amount,
    from,
    to,
  })

  // If some of the query params has an error
  if (!parsedQueryParams.success) {
    return res.status(StatusCodes.BadRequest).json({
      error: JSON.parse(parsedQueryParams.error.message),
    })
  }

  try {
    const exchangedValue = await convertCurrenciesServices.getExchangeAmount({
      from: parsedQueryParams.data.from,
      to: parsedQueryParams.data.to,
      amount: parsedQueryParams.data.amount,
    })

    res.status(StatusCodes.Success).json({
      result: exchangedValue,
      message: `${amount} ${from} equals to ${exchangedValue} ${to}`,
    })
  } catch (error) {
    error instanceof Error ? console.log(error?.stack) : console.log(error)

    res.status(StatusCodes.BadRequest).json({
      error: error?.toString() || ErrorMessages.BadRequest,
    })
  }
}

export default convertRatesController
