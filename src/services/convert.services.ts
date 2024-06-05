import { EXCHANGE_RATES_BASE_URL } from '../lib/constants'
import { ErrorMessages } from '../lib/erorrMessages.enum'
import { ConvertCurrenciesResponse } from '../types/responseTypes'
import { ConvertCurrencyParams } from '../validation/convertCurrency.schema'

const API_KEY = process.env.EXCHANGE_RATE_API_KEY

export const convertCurrenciesServices = {
  getExchangeAmount: async ({
    from,
    to,
    amount,
  }: ConvertCurrencyParams): Promise<number> => {
    const response = await fetch(
      `${EXCHANGE_RATES_BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`
    )

    if (!response.ok) {
      throw new Error(ErrorMessages.SomethingWentWrong)
    }

    const data: ConvertCurrenciesResponse = await response.json()

    if (data.result == 'error') {
      throw new Error(ErrorMessages.BadRequestInvalidParameters)
    }

    return data.conversion_rate
  },
}
