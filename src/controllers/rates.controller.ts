import { Request, Response } from 'express'
import { EXCHANGE_RATES_API_URL, STATUS_CODES } from '../lib/constants'

const API_KEY = process.env.EXCHANGE_RATE_API_KEY

const ratesController = async (_req: Request, res: Response) => {
  const baseCurrency = 'BGN'

  try {
    const response = await fetch(
      `${EXCHANGE_RATES_API_URL}/${API_KEY}/latest/${baseCurrency}`
    )
    const rates = await response.json()

    res.status(STATUS_CODES.SUCESS).json({
      rates,
    })
  } catch (error) {
    error instanceof Error ? console.log(error.stack) : console.log(error)

    res.status(STATUS_CODES.BAD_REQUEST).json({
      error,
    })
  }
}

export default ratesController
