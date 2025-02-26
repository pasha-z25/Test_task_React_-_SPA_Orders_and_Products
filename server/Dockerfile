FROM node:20

WORKDIR /server

COPY package*.json ./

RUN rm -rf node_modules

RUN npm install

COPY . .

EXPOSE 8888

CMD ["npm", "run", "docker"]
# CMD ["npx", "tsx", "src/index.ts"]
