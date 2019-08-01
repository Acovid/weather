# fill in the blanks to dockerize this node app
FROM node:10.15-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install && npm cache clean --force

COPY . .

CMD [ "node", "src/app.js -e js,hbs" ]
