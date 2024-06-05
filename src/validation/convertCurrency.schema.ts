import z from 'zod'
import { SUPPORTED_COUNTRY_CODES } from '../lib/constants'

export const ConvertCurrencySchema = z.object({
  amount: z.coerce
    .number({ message: 'Amount must be a number' })
    .min(1, 'Amount must be a positive number'),
  from: z
    .string({
      message: '"from" must be a string',
    })
    .toUpperCase()
    .refine((value: string) => SUPPORTED_COUNTRY_CODES.indexOf(value) !== -1, {
      message: `Currency is invalid or not supported`,
    }),
  to: z
    .string({
      message: '"to" must be a string',
    })
    .toUpperCase()
    .refine((value: string) => SUPPORTED_COUNTRY_CODES.indexOf(value) !== -1, {
      message: `Currency is invalid or not supported`,
    }),
})

export type ConvertCurrencyParams = z.infer<typeof ConvertCurrencySchema>
