FROM node:18

RUN mkdir /app
WORKDIR /app

COPY --chown=node:node package.json .
COPY --chown=node:node package-lock.json .
RUN npm install

CMD ["npm","run","dev"]
