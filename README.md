# Introduction

- This project contains a REST api server with jwt authentication system and
  prisma orm along side with postgresql database and a nextjs web for user to sharing
  youtube videos
- Api server has a websocket basic implementation for notify user newly created
  video

# Project dependencies (version details please visit package.json files)

## Api server

- Nestjs -> https://nestjs.com/
- Postgresql - https://www.postgresql.org/
- Bcrypt for password hash -> https://www.npmjs.com/package/bcrypt
- Class validator - class tranformation for user input validation -> https://docs.nestjs.com/techniques/validation
- Nestjs Gateway using socket.io wrapper -> https://docs.nestjs.com/websockets/gateways
- Prisma ORM to connect and interact with postgresql -> https://www.prisma.io/
- Jsonwebtoken for authentication -> https://jwt.io/
- Swagger for api docs -> https://docs.nestjs.com/openapi/introduction
- Jest for unit testing -> https://jestjs.io/
- Supertest for integration test -> https://github.com/ladjs/supertest

## Web

- Nextjs 13 with app directory routing -> https://nextjs.org/
- Next-auth to manage user authentication session -> https://next-auth.js.org/
- Zod for input validation -> https://zod.dev/
- React-hook-form for user form -> https://react-hook-form.com/
- Zustand for client state management -> https://zustand-demo.pmnd.rs/
- Socketio-client for websocket connection -> https://socket.io/
- Tailwindcss for styling -> https://tailwindcss.com/
- Shadcn ui components -> https://ui.shadcn.com/
- Jest, @testing-library/jest-dom, @testing-library/react
  @testing-library/user-event for unit testing
- Cypress for integration test -> https://www.cypress.io/

## How to begin

- Clone the repo

```shell
git clone -b main https://github.com/transonhy96/mono

```

- Change directory to repo
- Rename .env.example to .env in project root, packages/api and packages/web
- Build images &#8595;

## Build images

```shell
docker compose build
```

## Run services

```shell
docker compose up -d
```

## Incase docker got error

### Database

- Install postgresql -> https://www.postgresql.org/ and follow introduction for specific arch
- Create database and db username password
- Change db config in .env in packages/api
- Run database migration

### Database migration

```shell
npm run db:prepare-dev
```
### Api

```shell
 cd packages/api && npm install && npm db:prepare-dev && npm run dev
```

### Web

```shell
cd ../web && npm install && npm run dev

```

## Exposed services

| service | port |
| ------- | ---- |
| web     | 8080 |
| api     | 3000 |
| db      | 5432 |
| socket  | 3000 |

## Socket 

- Endpoint : http://localhost:3000/shares
- Require authentication using Authorization key in header of handsake like rest endpoint
- 
## Swagger Api document

- Api document located at https://api-r.onrender.com/api or http://localhost:3000/api

## Testing

### Unit test

- Backend
```shell
cd packages/api && npm run test
```
- Frontend
```shell
cd packages/web && npm run test
```
### Integration test

- Backend
```shell
cd packages/api && npm run test:e2e
```
- Frontend
```shell
cd packages/web && npm run cypress
```

## Usage

### Development

- Locate http://localhost:8080 to interact with frontend
- Api document located at http://localhost:3000/api

## Basic flow

- Visit https://reneck.vercel.app/ to interact with live version
- Non-authenticated user can view homepage with list of videos sharing
- User need to login to start sharing video
- Click to Login button in header navigation for Login or register account
- After login, start sharing by clicking to the email in navigation bar

## Troubleshooting

- Live server deploy on free hosting service so there will be delays and suchs
- Please test it with patient, if there is hanging or freezing screen please reload
