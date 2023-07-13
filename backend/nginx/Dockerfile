FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.crt /etc/ssl/
COPY ./nginx.key /etc/ssl
EXPOSE 80 443