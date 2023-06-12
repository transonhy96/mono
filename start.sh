chmod +x wait-for-postgres.sh
./wait-for-postgres.sh db:5432
yarn run db:prepare-prod
node .
