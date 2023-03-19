FROM node:18-alpine

RUN apk update && apk add bash

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000