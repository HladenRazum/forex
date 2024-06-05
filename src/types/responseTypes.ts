export enum ResponseResults {
  Success = 'success',
  Erorr = 'error',
}

export type RatesResponseSuccess = {
  result: ResponseResults.Success
  base_code: string
  conversion_rates: string[]
}

export type RatesResponseError = {
  result: ResponseResults.Erorr
  'error-type': string
}

export type RatesResponse = RatesResponseSuccess | RatesResponseError

export type ConvertCurrenciesResponseSuccess = {
  result: ResponseResults.Success
  base_code: string
  target_code: string
  conversion_rate: number
}

export type ConvertCurrenciesError = {
  result: ResponseResults.Erorr
  'error-type': string
}

export type ConvertCurrenciesResponse =
  | ConvertCurrenciesResponseSuccess
  | ConvertCurrenciesError
