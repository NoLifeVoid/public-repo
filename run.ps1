# compile TS
tsc

# remove all docker containers, images and volumes
docker-compose down -v
docker system prune -af --volumes

# start new database container
docker-compose up --build -d

# assemble connection string
node assemble.js

# wait until the dockerized MySQL is ready
node wait.js

# generate Prisma client
npx prisma generate

# push Prisma schema
npx prisma db push

# start app in watch mode
npm start
