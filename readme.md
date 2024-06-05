# Forex app

Allows users to check exchange rates for different currencies

To build this, I used [ExchangeRateApi](https://www.exchangerate-api.com/) which provides 1500 free requests per month

Documentation for ExchangeRateApi: https://www.exchangerate-api.com/docs

## Project Setup

- clone the repository
- go inside the folder and run `$npm install`
- create a <b>.env</b> file and copy the values from the <b>.env.sample</b> file
- the value for <b>EXCHANGE_RATE_API_KEY</b> is your API key and you can get one for free at https://www.exchangerate-api.com/
- the value for <b>PORT</b> is optional as will default to 5000

## Project Start

1. Once the project is set up, you can run `$npm run build` that will create a <b>dist</b> folder
2. Now you can run `$npm run start` and the application should start and be ready to receive requests

## API usage

We have two endpoints:<br>
GET <b>/rates/baseCode</b> - returns the current rates comparing to the base currency<br>
GET <b>/convert?from={EUR}&to={BGN}&amount={1000}</b> - returns the result of the converted currency

> Please make sure to add the base url before the endpoints
> http://localhost:5000/rates

### Examples

- GET /rates/USD

```
 "base-currency": "USD",
  "rates": {
      "USD": 1,
      "AED": 3.6725,
      "AFN": 70.6267,
      "ALL": 92.1576,
      "AMD": 387.8172,
      "ANG": 1.79,
      "AOA": 862.6398,
      ...
      }
```

- GET /convert?from=USD&to=EUR&amount=1

```
{
  "result": 0.9195,
  "message": "1 USD equals to 0.9195 EUR"
}
```
