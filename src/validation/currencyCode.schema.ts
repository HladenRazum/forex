import z from 'zod'
import { SUPPORTED_CURRENCY_CODES } from '../lib/constants'

export const CurrencyCodeSchema = z
  .string({
    message: 'parameter must be a string',
  })
  .toUpperCase()
  .refine((value: string) => SUPPORTED_CURRENCY_CODES.indexOf(value) !== -1, {
    message: `Currency is invalid or not supported`,
  })

export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>
