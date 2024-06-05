import {
  BASE_URL,
  DEFAULT_CURRENCY,
  SUPPORTED_CURRENCY_CODES,
} from '../lib/constants'
import { ErrorMessages } from '../lib/erorrMessages.enum'
import { StatusCodes } from '../lib/statusCodes.enum'

type ResponseDataSuccess = {
  'base-currency': string
  rates: {
    [key: string]: number
  }
}

type ResponseDataError = {
  error: string
}

describe('GET /rates endpoint', () => {
  describe("Should receive an object with 'rates' property that includes avaialable currencies and their rates", () => {
    it("Should have default base currency if no parameter 'currencyCode' is provided", async () => {
      const response = await fetch('http://localhost:5000/rates')
      const data: ResponseDataSuccess = await response.json()

      expect(response.status).toBe(StatusCodes.Success)
      expect(data['base-currency']).toBe(DEFAULT_CURRENCY)
      // rates object looks like this - rates: {"AED": 3.6725, "AFN": 70.6267, "ALL": 92.1576}
      expect(Object.entries(data.rates).length).toBeGreaterThan(0)
    })

    it("Should be able to set the base-currency when providing parameter for 'currencyCode' ex: '/rates/USD ", async () => {
      const randomSuportedCurrency =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]
      const response = await fetch(
        `${BASE_URL}/rates/${randomSuportedCurrency}`
      )
      const data = await response.json()

      expect(response.status).toBe(StatusCodes.Success)
      expect(data['base-currency']).toBe(randomSuportedCurrency)
      expect(Object.entries(data.rates).length).toBeGreaterThan(0)
    })
  })

  describe("Should return status 400 and object with an error key if invalid parameter for 'currencyCode' is provided", () => {
    it('Should return status 400 and object with an error key if the type of parameter is number', async () => {
      const invalidTypeParameter: number = 1

      const response = await fetch(`${BASE_URL}/rates/${invalidTypeParameter}`)

      const data: ResponseDataError = await response.json()

      expect(response.status).toBe(StatusCodes.BadRequest)
      expect(data.error).toBe(ErrorMessages.InvalidParameterOrCurrency)
    })

    it('Should return status 400 and object with an error key if type of parameter is an object', async () => {
      const invalidTypeParameter: object = {
        amount: 10,
        currency: 'BGN',
      }

      const response = await fetch(`${BASE_URL}/rates/${invalidTypeParameter}`)

      const data: ResponseDataError = await response.json()

      expect(response.status).toBe(StatusCodes.BadRequest)
      expect(data.error).toBe(ErrorMessages.InvalidParameterOrCurrency)
    })

    it('Should return status 400 and object with an error key if the type of parameter is an array', async () => {
      const invalidTypeParameter: any[] = [1, 2, 3]

      const response = await fetch(`${BASE_URL}/rates/${invalidTypeParameter}`)

      const data: ResponseDataError = await response.json()

      expect(response.status).toBe(StatusCodes.BadRequest)
      expect(data.error).toBe(ErrorMessages.InvalidParameterOrCurrency)
    })

    it('Should return status 400 and object with an error key if the type of parameter is a boolean', async () => {
      const invalidTypeParameter: boolean = true

      const response = await fetch(`${BASE_URL}/rates/${invalidTypeParameter}`)

      const data: ResponseDataError = await response.json()

      expect(response.status).toBe(StatusCodes.BadRequest)
      expect(data.error).toBe(ErrorMessages.InvalidParameterOrCurrency)
    })

    it('Should return status 400 and object with an error key if the parameter is string, but NOT among the supported currency codes', async () => {
      const unsupporedCurrency: string = 'Unsupported'

      const response = await fetch(`${BASE_URL}/rates/${unsupporedCurrency}`)
      const data: ResponseDataError = await response.json()

      expect(SUPPORTED_CURRENCY_CODES.indexOf(unsupporedCurrency)).toBe(-1)
      expect(response.status).toBe(StatusCodes.BadRequest)
      expect(data.error).toBe(ErrorMessages.InvalidParameterOrCurrency)
    })
  })
})
