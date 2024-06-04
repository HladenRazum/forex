import { Response, Request } from 'express'
import {
  EXCHANGE_RATES_API_URL,
  STATUS_CODES,
  SUPPORTED_COUNTRY_CODES,
} from '../lib/constants'

const API_KEY = process.env.EXCHANGE_RATE_API_KEY

const convertRatesController = async (req: Request, res: Response) => {
  return res.status(200).json({
    codes: SUPPORTED_COUNTRY_CODES,
  })

  // const { amount, from, to } = req.query

  // if (!amount || !from || !to) {
  //   return res.status(STATUS_CODES.BAD_REQUEST).json({
  //     error: 'Missing required query parameters',
  //   })
  // }

  // // TODO:
  // // VALIDE THE INPUTS
  // // from and to need to be in the array of accepted currencies
  // // amount need to be > 0

  // try {
  //   const response = await fetch(
  //     `${EXCHANGE_RATES_API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`
  //   )
  //   const result = await response.json()

  //   if (result.result == 'error') {
  //     throw new Error(
  //       "Bad request. Please make sure that you're providing the correct parameters"
  //     )
  //   }
  //   const converted = result.conversion_result

  //   res.status(STATUS_CODES.SUCESS).json({
  //     result: converted,
  //     message: `${amount} ${from} equals ${result} ${to}`,
  //   })
  // } catch (error) {
  //   error instanceof Error ? console.log(error?.stack) : console.log(error)

  //   res.status(STATUS_CODES.BAD_REQUEST).json({
  //     error: error?.toString() || 'Bad request',
  //   })
  // }
}

export default convertRatesController
