FROM node:lts-stretch

RUN npm install -g -s yarn nodemon

RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
