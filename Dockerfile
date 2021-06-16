FROM node:14 as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8080


ENV NODE_PATH=./build

RUN npm run build

CMD [ "npm", "start" ]