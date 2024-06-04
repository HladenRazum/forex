import dotenv from 'dotenv'
dotenv.config()

import express, { type Express } from 'express'
import { ENDPOINTS } from './lib/constants'
import ratesController from './controllers/rates.controller'
import convertRatesController from './controllers/convertRates.controller'

const PORT = 5000

const app: Express = express()

app.get(ENDPOINTS.RATES, ratesController)
app.post(ENDPOINTS.CONVERT, convertRatesController)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
