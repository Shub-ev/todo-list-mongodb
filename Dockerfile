# writing my first Dockerfile
# 23-08-2024
# Shubham Mahesh Gharage

# adding the base image (using alpine which is derived from Linux Alpine Project)
FROM node:20-alpine

#creating subdirectory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

#setting working directory
WORKDIR /home/node/app

#copy package.json and package-lock.json
COPY package*.json ./

USER node

RUN npm install

COPY --chwon=node:node . .

EXPOSE 8080
EXPOSE 1324

CMD [ "node", "server.js" ]