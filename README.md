# Current Game Info for League of Legends
This is a webserver that exposes a single enpoint '/currentGameRankings', which gives the rank of each summoner on the enemy team.

### Info
--- 
Riot Games API keys expire after a day, so remember to update it:
```bash
set -xg LeagueKey this_is_the_key
```

Use ngrok to create a public url for the api.ai webhook
