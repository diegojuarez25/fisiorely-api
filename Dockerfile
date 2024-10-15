FROM node:18

WORKDIR /app
ADD src/ /app/src/
ADD package*.json ./

RUN npm install

CMD ["npm","start"]
