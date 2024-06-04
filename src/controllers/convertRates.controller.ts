import { Response, Request } from 'express'
import { EXCHANGE_RATES_BASE_URL } from '../lib/constants'
import { ConvertCurrencySchema } from '../validation/convertCurrency.schema'
import { StatusCodes } from '../lib/StatusCodes.enum'

const convertRatesController = async (req: Request, res: Response) => {
  const { amount, from, to } = req.query

  if (!amount || !from || !to) {
    return res.status(StatusCodes.BadRequest).json({
      error: 'Missing required query parameters',
    })
  }

  const parsedQueryParams = ConvertCurrencySchema.safeParse({
    amount,
    from,
    to,
  })

  if (!parsedQueryParams.success) {
    return res.status(StatusCodes.BadRequest).json({
      message: 'Invalid parameters',
      error: JSON.parse(parsedQueryParams.error.message),
    })
  }

  try {
    const API_KEY = process.env.EXCHANGE_RATE_API_KEY

    const response = await fetch(
      `${EXCHANGE_RATES_BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`
    )
    const data = await response.json()

    if (data.result == 'error') {
      throw new Error(
        "Bad request. Please make sure that you're providing the correct parameters"
      )
    }

    const converted = data.conversion_result

    res.status(StatusCodes.Success).json({
      result: converted,
      message: `${amount} ${from} equals to ${converted} ${to}`,
    })
  } catch (error) {
    error instanceof Error ? console.log(error?.stack) : console.log(error)

    res.status(StatusCodes.BadRequest).json({
      error: error?.toString() || 'Bad request',
    })
  }
}

export default convertRatesController
