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

// Handle both rates/ and rates/currencyCode
app.get(
  [Endpoints.Rates, Endpoints.RatesWithCodeParams],

  // TODO: Remove the middleware when finished with the tests
  (req, res, next) => {
    console.log(req.method)
    console.log(res.statusCode)
    next()
  },

  ratesController
)
app.get(
  Endpoints.Convert,

  // TODO: Remove the middleware when finished with the tests
  (req, res, next) => {
    console.log(req.method)
    console.log(res.statusCode)
    next()
  },

  convertController
)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
