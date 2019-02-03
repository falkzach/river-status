FROM node:lts-stretch

RUN npm install -g -s yarn nodemon

RUN mkdir -p /usr/src/backend
WORKDIR /usr/src/backend

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

ENTRYPOINT yarn db-migrate up && yarn server
