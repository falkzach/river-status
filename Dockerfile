# HOWTO: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:lts-stretch

RUN npm install -g -s yarn nodemon

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

RUN mkdir client
COPY client/package.json ./client
COPY client/yarn.lock ./client
RUN cd client && yarn install
RUN cd ..

#Bundle app source
COPY . .

RUN ls
RUN ls ./client

EXPOSE 3000
CMD [ "yarn", "dev" ]
