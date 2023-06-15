chmod +x wait-for-postgres.sh
./wait-for-postgres.sh db:5435
npm run db:prepare-dev
node ./dist/main.js
