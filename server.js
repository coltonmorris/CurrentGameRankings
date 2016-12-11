// my summoner id is 38918850

let express   = require('express')
let app       = express()
let currentGameRankings = require('./currentGameRankings')

app.get('/currentGameRankings', (req, res) => {
  currentGameRankings(req.query.summonerName)
  .then((rankings) => {
    res.send(rankings)
  })
  .catch((err) => {
    res.status(500).send({ error: err.message})
  })
})

app.get('/', (req, res) => {
  console.log('request just came in')
  res.send('FUCK YOU JASPER')
})


app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
