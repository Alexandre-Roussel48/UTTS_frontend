FROM node:lts-alpine

RUN npm install -g serve

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5002

CMD ["serve", "-s", "dist", "-l", "5002"]