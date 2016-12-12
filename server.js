// my summoner id is 38918850

let express   = require('express')
let app       = express()
let bodyParser = require('body-parser')
let currentGameRankings = require('./currentGameRankings')

app.use(bodyParser.json())

app.get('/currentGameRankings', (req, res) => {
  currentGameRankings(req.query.summonerName)
  .then((rankings) => {
    res.send(rankings)
  })
  .catch((err) => {
    res.status(500).send({ error: err.message})
  })
})


app.post('/currentGameRankings', (req, res) => {
  currentGameRankings(req.body.summonerName)
  .then((rankings) => {
    res.send(rankings)
  })
  .catch((err) => {
    res.status(500).send({ error: err.message})
  })
})

app.get('/Christy', (req, res) => {
  console.log('visiting /christy')
  res.send('Skype me?')
})

app.get('/hey', (req, res) => {
  console.log('visiting /hey')
  res.send('Hey, you are cute')
})

app.get('/', (req, res) => {
  console.log('request just came in')
  res.send('Coltons space for making cool shit')
})


app.listen(8080, () => {
  console.log('Server is listening on port 8080')
})
