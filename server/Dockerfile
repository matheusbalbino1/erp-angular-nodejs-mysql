FROM node:18-alpine

RUN apk update && apk add bash

ENV NODE_ENV=production
ENV ASSIGN_JWT=password

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g nodemon ts-node sequelize-cli

RUN npm install

COPY . .

EXPOSE 3000