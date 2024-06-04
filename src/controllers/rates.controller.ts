import { Request, Response } from 'express'
import { EXCHANGE_RATES_BASE_URL } from '../lib/constants'
import { StatusCodes } from '../lib/StatusCodes.enum'

const API_KEY = process.env.EXCHANGE_RATE_API_KEY

const ratesController = async (_req: Request, res: Response) => {
  // TODO: accept a params object? :CODE and validate it
  // provide a defaut baseCurrency if not params are given
  const baseCurrency = 'BGN'

  try {
    const response = await fetch(
      `${EXCHANGE_RATES_BASE_URL}/${API_KEY}/latest/${baseCurrency}`
    )
    const rates = await response.json()

    res.status(StatusCodes.Success).json({
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
