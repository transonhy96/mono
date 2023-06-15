FROM node:18 as development

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

COPY tsconfig.build.json ./

COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

RUN npx prisma generate

# Start the server using the production build
CMD npm start

