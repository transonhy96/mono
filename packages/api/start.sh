chmod +x wait-for-postgres.sh
./wait-for-postgres.sh db:5435
npx prisma migrate dev
npx prisma generate
nest start --watch
