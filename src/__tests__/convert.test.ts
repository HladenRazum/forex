import { BASE_URL, SUPPORTED_CURRENCY_CODES } from '../lib/constants'
import { StatusCodes } from '../lib/statusCodes.enum'

type SuccessResponse = {
  result: number
  message: string
}

type ErrorResponse = {
  error: [
    {
      message: string
    }
  ]
}

const fetchConvertRates = async ({ from, to, amount }: any) => {
  return await fetch(
    `${BASE_URL}/convert?from=${from}&to=${to}&amount=${amount}`
  )
}

describe('GET /convert endpoint', () => {
  it('Should return an object with a result holding the value of converted currency', async () => {
    const from =
      SUPPORTED_CURRENCY_CODES[
        Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
      ] // Random currency from suported ones
    const to =
      SUPPORTED_CURRENCY_CODES[
        Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
      ]
    const amount = 1000

    const response = await fetchConvertRates({
      from,
      to,
      amount,
    })

    const data: SuccessResponse = await response.json()

    expect(response.status).toBe(StatusCodes.Success)
    expect(data.result).toBeTruthy()
    expect(data.result).toBeGreaterThan(0)
    expect(data.message).toBeTruthy()
  })

  describe('Should return 400 status and error message for invalid query parameters', () => {
    it("when 'from' is not a string", async () => {
      const from: number = 1
      const to =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]
      const amount = 1000

      const response = await fetchConvertRates({
        from,
        to,
        amount,
      })

      const data: ErrorResponse = await response.json()

      expect(response.status).toBe(StatusCodes.BadRequest)
      expect(data.error[0].message).toBeTruthy()
    })

    it("when 'from' is not among the supported currencies", async () => {
      const from = 'UnsupportedCode'
      const to =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]
      const amount = 1000

      const response = await fetchConvertRates({
        from,
        to,
        amount,
      })

      const data: ErrorResponse = await response.json()

      expect(response.status).toEqual(StatusCodes.BadRequest)
      expect(SUPPORTED_CURRENCY_CODES.indexOf(from)).toBe(-1)
      expect(data.error[0].message).toBeTruthy()
    })

    it("when 'to' is not a string", async () => {
      const from =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]
      const amount = 1000
      const to: number = 123

      const response = await fetchConvertRates({
        from,
        to,
        amount,
      })

      const data: ErrorResponse = await response.json()

      expect(response.status).toBe(StatusCodes.BadRequest)
      expect(data.error[0].message).toBeTruthy()
    })

    it("when 'to' is not among the supported currencies", async () => {
      const from =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]
      const to = 'UnsupportedCode'
      const amount = 1000

      const response = await fetchConvertRates({
        from,
        to,
        amount,
      })

      const data: ErrorResponse = await response.json()

      expect(response.status).toEqual(StatusCodes.BadRequest)
      expect(SUPPORTED_CURRENCY_CODES.indexOf(to)).toBe(-1)
      expect(data.error[0].message).toBeTruthy()
    })

    it("when 'amount' is not a number", async () => {
      const from =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]
      const to =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]

      // As we're coercing strings that can be converted to numbers '123' would not throw an error
      const amount: string = 'sometext'

      const response = await fetchConvertRates({
        from,
        to,
        amount,
      })

      const data: ErrorResponse = await response.json()
      expect(response.status).toEqual(StatusCodes.BadRequest)
      expect(data.error[0].message).toBeTruthy()
    })

    it("when 'amount' is a number < 1", async () => {
      const from =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]
      const to =
        SUPPORTED_CURRENCY_CODES[
          Math.ceil(Math.random() * SUPPORTED_CURRENCY_CODES.length)
        ]

      const amount: number = 0.00001

      const response = await fetchConvertRates({
        from,
        to,
        amount,
      })

      const data: ErrorResponse = await response.json()
      expect(response.status).toEqual(StatusCodes.BadRequest)
      expect(data.error[0].message).toBeTruthy()
    })
  })
})
