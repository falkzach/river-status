# TODO!

FROM node:lts-stretch

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

#Bundle app source
COPY . .

EXPOSE 3000
CMD [ "yarn", "dev" ]

