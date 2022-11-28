FROM node:16-alpine

WORKDIR /usr/dev

COPY package.json ./
COPY .env /

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]