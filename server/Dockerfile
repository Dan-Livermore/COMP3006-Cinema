FROM node:18

WORKDIR /server

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3060

CMD ["npm", "start"]
