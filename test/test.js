let request = require('superagent')
let chai = require('chai')
let expect = chai.expect
let chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

let voy = 'Voyboy'
let summonerInGame = 'HiHi Its Tye Tye'
let summonerOutOfGame = 'Kingrazy'
// let url = 'http://ddb2c263.ngrok.io/'
let url = 'localhost/'
let endpoint = 'currentGameRankings'

describe(`tests for endpoint: ${endpoint}`, function () {
  this.timeout(15000)

  it.skip('should return an error because the summoner is not in a game', function () {
    return expect(
      request
        .get(url + endpoint)
        .query({ summonerName: summonerOutOfGame })
    ).to.eventually.be.rejected
  })
   it('should hit the endpoint successfully using GET', function () {
     return expect(
       request
         .get(url + endpoint)
         .query({ summonerName: summonerInGame})
       .then((res) => (res['body']))
     ).to.eventually.have.lengthOf(5)
   })
   it.skip('should hit the endpoint successfully using POST', function () {
     return expect(
       request
         .get(url + endpoint)
         .query({ summonerName: summonerInGame})
       .then((res) => (res['body']))
     ).to.eventually.have.lengthOf(5)
   })
})

