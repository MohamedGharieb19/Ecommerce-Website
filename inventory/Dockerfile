FROM node:latest

RUN mkdir /src
WORKDIR /src

COPY . /src

RUN npm install

EXPOSE 5000

CMD npm run start