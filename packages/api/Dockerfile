

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine  

USER node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node package*.json ./

RUN yarn install

COPY --chown=node . .

RUN yarn build

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000

CMD ["sh", "start.sh"]
