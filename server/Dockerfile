FROM node:20

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules

RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "run", "dev"]
