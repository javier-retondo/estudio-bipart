FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm install typescript@5.7.3 pm2 -g
RUN npm run build

CMD ["pm2-runtime", "start", "./dist/app.js"]
