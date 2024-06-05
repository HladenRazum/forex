import { EXCHANGE_RATES_BASE_URL } from '../lib/constants'
import { RatesResponse } from '../types/responseTypes'
import { CurrencyCode } from '../validation/currencyCode.schema'

const API_KEY = process.env.EXCHANGE_RATE_API_KEY

export const ratesServices = {
  getRates: async (currencyCode: CurrencyCode): Promise<string[]> => {
    const response = await fetch(
      `${EXCHANGE_RATES_BASE_URL}/${API_KEY}/latest/${currencyCode}`
    )

    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const data: RatesResponse = await response.json()

    if (data.result == 'error') {
      throw new Error(
        "Bad request. Please make sure that you're providing the correct parameters"
      )
    }

    return data.conversion_rates
  },
}
