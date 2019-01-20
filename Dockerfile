# HOWTO: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

FROM node:lts-stretch

RUN npm install -g -s yarn

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

#Bundle app source
COPY . .

EXPOSE 3000
CMD [ "yarn", "dev" ]
