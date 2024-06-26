import dotenv from 'dotenv'
// Make env config available before importing any other files
dotenv.config()

import express, { type Express } from 'express'
import ratesController from './controllers/rates.controller'
import convertController from './controllers/convert.controller'
import { Endpoints } from './lib/endpoints.enum'
import { DEFAULT_PORT } from './lib/constants'

const PORT = process.env.PORT || DEFAULT_PORT

const app: Express = express()

app.get([Endpoints.Rates, Endpoints.RatesWithCodeParams], ratesController)
app.get(Endpoints.Convert, convertController)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
