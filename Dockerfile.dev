FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps
RUN npm install -g ts-node

COPY . .

CMD ["npm", "run", "dev"]