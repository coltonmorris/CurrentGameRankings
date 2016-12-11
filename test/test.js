let request = require('superagent')
let chai = require('chai')
let expect = chai.expect
let chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

let summonerInGame = 'cris'
let summonerOutOfGame = 'Kingrazy'

describe('test for /currentGameRankings', function () {
  it('should return an error because the summoner is not in a game', function () {
    return expect(
      request
        .get('localhost:3000/currentGameRankings')
        .query({ summonerName: summonerOutOfGame })
        .then((res) => {
          console.log('bad summoner test: ')
          return res
        })
    ).to.eventually.be.rejected
  })
   it('should hit the endpoint successfully', function () {
     return expect(
       request
         .get('localhost:3000/currentGameRankings')
         .query({ summonerName: summonerInGame})
       .then((res) => (res['body']))
     ).to.eventually.have.lengthOf(5)
   })
})

