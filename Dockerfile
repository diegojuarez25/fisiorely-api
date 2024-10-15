FROM node:18

RUN mkdir /app
WORKDIR /app


RUN npm install

CMD ["npm","run","dev"]
