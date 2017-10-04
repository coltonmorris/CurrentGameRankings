let LeagueJs  = require('leaguejs');
let Promise   = require('bluebird')
let config    = require('config')
let champions = require('./champions.json')['data']

let api = new LeagueJs(config.get('key'),
    { PLATFORM_ID: 'na1',
      limits: {allowBurst: true}
    }
)
api.updateRateLimiter({allowBursts: true})


module.exports = (summonerName) => {
  // get the summonerId from the name
  return getSummonerId(summonerName)
  // get game object
  .then((summonerId) => (getGameInfo(summonerId)))
  // get the other teams ranks now that we have a list of all the summonerIds
  .then((gameObj) => (getRanks(gameObj)))
  // get the other teams champion names
  .then((gameObj) => (getChampNames(gameObj)))
}


let getSummonerId = (summonerName) => {
  console.log('in getSummonerId', summonerName)
  return api.Summoner.gettingByName(summonerName)
  .then((summoner) => {
    return summoner.id
  })
}

let getGameInfo = (summonerId) => {
  //TODO make dis get the match id
  console.log('in getGameInfo: ', summonerId)
  return api.Spectator.gettingActiveGame(summonerId)
  .then((res) => {
    console.log('check here for ranks: ', res)
    let redSide = []  // teamId is 200
    let blueSide = [] // teamId is 100
    let ourSide
    

    // split the summoners into their respective sides
    res.participants.map((summoner) => {
      if (summoner.summonerId == summonerId) {
        // find out which team is the enemy team
        ourSide = summoner.teamId

      }
      if (summoner.teamId == 200) {
        // red side
        redSide.push({ 'summonerName': summoner.summonerName, 'summonerId': summoner.summonerId, 'champId': summoner.championId })
      }
      else {
        // blue side
        blueSide.push({ 'summonerName': summoner.summonerName, 'summonerId': summoner.summonerId, 'champId': summoner.championId })
      }
    })
  
    // return the side our summoner wasn't on
    if (ourSide == 200) {
      return blueSide
    }
    return redSide
  })
  .catch((err) => { console.log('error yo: ', err) })
}

let getRanks = (gameObj) => {
  return Promise.map(gameObj, (player) => {
    return api.League.gettingPositionsForSummonerId(player.summonerId)
    .then((res) => {
      let tier = res[0].tier
      let division = res[0].rank

      player['tier'] = tier
      player['division'] = division
      player['queueType'] = res[0].queueType
    })
    .catch((err) => {
      console.log('player is unranked')
      player['tier'] = null
      player['division'] = 'unranked'
      player['queueType'] = null
    })
  })
  .then(() => (gameObj))
}

let getChampNames = (gameObj) => {
  gameObj.map((player) => {
    player['champName'] = champions[player.champId]['name']
  })
  console.log('final object: ', gameObj)
  return gameObj
}
