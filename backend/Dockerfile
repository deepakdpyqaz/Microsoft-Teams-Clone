FROM node:14-alpine as build-step
RUN mkdir /server
WORKDIR /server
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8080
CMD ["node","server.js"]