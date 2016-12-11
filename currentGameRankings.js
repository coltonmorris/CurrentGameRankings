let LolApi    = require('leagueapi');
let api_key   = process.env.LeagueKey
let Promise   = require('bluebird')

LolApi.init(api_key, 'na')

module.exports = (summonerName) => {
  // get the summonerId from the name
  return getSummonerId(summonerName)
  // get the other teams summonerIds
  .then((summonerId) => (getOtherTeamSummonerIdsAndChampIds(summonerId)))
  // get the other teams ranks
  .then((gameObj) => (getRanks(gameObj)))
  // get the other teams champion names
  .then((gameObj) => (getChampNames(gameObj)))
}


let getSummonerId = (summonerName) => {
  console.log('in getSummonerId', summonerName)
  return LolApi.Summoner.getByName(summonerName)
  .then((summoner) => {
    let name = Object.keys(summoner)[0]
    return summoner[name].id
  })
}

let getOtherTeamSummonerIdsAndChampIds = (summonerId) => {
  return LolApi.getCurrentGame(summonerId, 'na')
  .then((res) => {
    let redSide = []  // teamId is 100
    let blueSide = [] // teamId is 200
    let ourSide
    

    // split the summoners into their respective sides
    res.participants.map((summoner) => {
      if (summoner.summonerId == summonerId) {
        // find out which team is the enemy team
        ourSide = summoner.teamId

      }
      if (summoner.teamId == 100) {
        // red side
        redSide.push({ 'summonerName': summoner.summonerName, 'summonerId': summoner.summonerId, 'champId': summoner.championId })
      }
      else {
        // blue side
        blueSide.push({ 'summonerName': summoner.summonerName, 'summonerId': summoner.summonerId, 'champId': summoner.championId })
      }
    })
  
    // return the side our summoner wasn't on
    if (ourSide == 100) {
      return blueSide
    }
    return redSide
  })
}

let getRanks = (gameObj) => {
  return Promise.map(gameObj, (player) => {
    return LolApi.getLeagueEntryData(player.summonerId, 'na')
    .then((res) => {
      let tier = res[player.summonerId][0].tier
      let division = res[player.summonerId][0].entries[0].division

      player['tier'] = tier
      player['division'] = division
    })
    .catch((err) => {
      console.log('player is unranked')
      player['tier'] = null
      player['division'] = 'unranked'
    })
  })
  .then(() => (gameObj))
}

let getChampNames = (gameObj) => {
  return Promise.map(gameObj, (player) => {
    return LolApi.Static.getChampionById(player.champId, 'info', 'na')
    .then((champ) => {
      player['champName'] = champ.name
    })
  })
  .then(() => {
    console.log('final object: ', gameObj)
    return gameObj
  })
}
