FROM node:lts-stretch

RUN npm install -g -s yarn nodemon db-migrate

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install
