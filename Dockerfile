From node:6-alpine

#create app directory
RUN mkdir /app


# Install dependencies
COPY ./package.json /app
COPY ./server.js /app
COPY ./currentGameRankings.js /app

COPY ./node_modules/ /app/node_modules
COPY ./test/ /app/test

WORKDIR /app
EXPOSE 8080

CMD [ "npm", "start" ]
