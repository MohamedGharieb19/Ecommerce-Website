FROM node:latest

RUN mkdir /src
WORKDIR /src

COPY . /src

RUN npm install

EXPOSE 8000

CMD npm run server