import { EXCHANGE_RATES_BASE_URL } from '../lib/constants'
import { ConvertCurrenciesResponse } from '../types/responseTypes'

type GetExchangeAmountParamsType = {
  from: string
  to: string
  amount: number
}

const API_KEY = process.env.EXCHANGE_RATE_API_KEY

export const convertCurrenciesServices = {
  getExchangeAmount: async ({
    from,
    to,
    amount,
  }: GetExchangeAmountParamsType) => {
    const response = await fetch(
      `${EXCHANGE_RATES_BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`
    )

    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const data: ConvertCurrenciesResponse = await response.json()

    // Error result from exchangerate API
    if (data.result == 'error') {
      throw new Error(
        "Bad request. Please make sure that you're providing the correct parameters"
      )
    }

    return data.conversion_rate
  },
}
