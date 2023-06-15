# Development
FROM node:18-alpine As development

WORKDIR /usr/src/web

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
RUN npm run dev