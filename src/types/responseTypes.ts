/**
 * For response types I included only the properties that were needed for the app 
 * 
 * Here are some of the omitted properties that are coming from the api:
    "documentation": "https://www.exchangerate-api.com/docs",
    "terms_of_use": "https://www.exchangerate-api.com/terms",
    "time_last_update_unix": 1717545601,
    "time_last_update_utc": "Wed, 05 Jun 2024 00:00:01 +0000",
    "time_next_update_unix": 1717632001,
    "time_next_update_utc": "Thu, 06 Jun 2024 00:00:01 +0000",
*/

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
