# Development
FROM node:18-alpine

WORKDIR /usr/src/web

COPY package.json yarn.lock ./
RUN yarn install \
  && yarn cache clean

COPY --chown=node . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "dev"]
