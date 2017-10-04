# Current Game Info for League of Legends
This is a webserver that exposes a single enpoint '/currentGameRankings', which gives the rank of each summoner on the enemy team.

### Info
--- 
This project uses [node-config](https://github.com/lorenwest/node-config) for the api key. Add the file ```default.json``` in the config directory with the following structure:
``` json
{
  "key": "your api key"
}
```

Use ngrok to create a public url for the api.ai webhook
