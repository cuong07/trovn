# Use the official Node.js 20.9 image
FROM node:20.9

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8888

CMD ["npm", "start"]
