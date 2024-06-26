import { Request, Response } from 'express'
import { StatusCodes } from '../lib/statusCodes.enum'
import { CurrencyCodeSchema } from '../validation/currencyCode.schema'
import { ratesServices } from '../services/rates.serices'
import { DEFAULT_CURRENCY } from '../lib/constants'
import { ErrorMessages } from '../lib/erorrMessages.enum'

const ratesController = async (req: Request, res: Response) => {
  const currencyCode = req.params.currencyCode ?? DEFAULT_CURRENCY

  const parsedData = CurrencyCodeSchema.safeParse(currencyCode)

  if (parsedData.error) {
    return res.status(StatusCodes.BadRequest).json({
      error: ErrorMessages.InvalidParameterOrCurrency,
    })
  }

  try {
    const rates = await ratesServices.getRates(parsedData.data)

    res.status(StatusCodes.Success).json({
      'base-currency': parsedData.data,
      rates,
    })
  } catch (error) {
    error instanceof Error ? console.log(error.stack) : console.log(error)

    res.status(StatusCodes.BadRequest).json({
      error,
    })
  }
}

export default ratesController
