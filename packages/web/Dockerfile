# Development
FROM node:18-alpine As development

WORKDIR /usr/src/web

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine As production

WORKDIR /usr/src/web

COPY --from=development /usr/src/web/package*.json ./
COPY --from=development /usr/src/web/.next ./.next
COPY --from=development /usr/src/web/public ./public
COPY --from=development /usr/src/web/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 8080
RUN npm run start
