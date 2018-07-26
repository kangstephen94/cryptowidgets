const express = require(`express`)
const fetch = require(`node-fetch`)
const app = express()
const PORT = process.env.PORT || 8000

const getPrice = function (data) {
  return data.quotes.USD.price
}

const getVolume= function (data) {
  return data.quotes.USD.volume_24h
}

app.listen(PORT, () => {
  console.log(__dirname)
  console.log(`listening on ${PORT}`)
})

app.get(`/`, (req, res) => {
  fetch(`https://api.coinmarketcap.com/v2/ticker/?start=101&limit=10&sort=volume_24h&structure=array`)
    .then(function (response) {
      return response.json()
    })
    .then(json => {
      console.log(`Top 10 CryptoCurrencies with largest 24h volume (coinmarketcap)`)
      json.data.forEach(token => {
        console.log(`${token.name}|  Price: $${getPrice(token)} Volume: ${getVolume(token)}`)
      })
    })
})
