import dotenv from 'dotenv'
// Make env config available before importing any other files
dotenv.config()

import express, { type Express } from 'express'
import ratesController from './controllers/rates.controller'
import convertRatesController from './controllers/convertRates.controller'
import { Endpoints } from './lib/endpoints.enum'

const PORT = process.env.PORT || 5000

const app: Express = express()

app.get([Endpoints.Rates, Endpoints.RatesWithCodeParams], ratesController)
app.get(Endpoints.Convert, convertRatesController)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

// TODO: Add types for api responses
