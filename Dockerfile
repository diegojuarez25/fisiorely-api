FROM node:18

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .
RUN npx prisma migrate dev fisiorely-deploy
RUN npx prisma generate
CMD ["npm", "start"]

