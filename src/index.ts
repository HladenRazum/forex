import express, { type Express } from 'express'

const PORT = 5000

const app: Express = express()

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
