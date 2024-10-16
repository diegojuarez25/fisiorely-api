FROM node:18

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . .
RUN npm install -g prisma
RUN npx prisma generate
CMD ["npm", "start"]

