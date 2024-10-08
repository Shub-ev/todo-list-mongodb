# writing my first Dockerfile
# 23-08-2024
# Shubham Mahesh Gharage

FROM node:20-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN chown -R node:node /home/node/app

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 1324

CMD [ "node", "server.js" ]
