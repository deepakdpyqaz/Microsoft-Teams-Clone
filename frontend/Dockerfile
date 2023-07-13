# Step 1

FROM node:14-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN apk update && apk add python3 make g++
RUN ln -sf python3 /usr/bin/python
RUN npm install
COPY . /app
RUN npm run build
# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
CMD ["CHOWN", "-R", "nginx:nginx", "/usr/share/nginx/html"]
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.crt /etc/ssl/
COPY ./nginx/nginx.key /etc/ssl
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80 443