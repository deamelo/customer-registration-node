FROM node:16.15.1

RUN apt-get update

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . .

CMD ["yarn", "dev"]