import { EXCHANGE_RATES_BASE_URL } from '../lib/constants'
import { ErrorMessages } from '../lib/erorrMessages.enum'
import { RatesResponse } from '../types/responseTypes'
import { CurrencyCode } from '../validation/currencyCode.schema'

const API_KEY = process.env.EXCHANGE_RATE_API_KEY

export const ratesServices = {
  getRates: async (currencyCode: CurrencyCode): Promise<string[]> => {
    const response = await fetch(
      `${EXCHANGE_RATES_BASE_URL}/${API_KEY}/latest/${currencyCode}`
    )

    if (!response.ok) {
      throw new Error(ErrorMessages.SomethingWentWrong)
    }

    const data: RatesResponse = await response.json()

    if (data.result == 'error') {
      throw new Error(ErrorMessages.BadRequestInvalidParameters)
    }

    return data.conversion_rates
  },
}
