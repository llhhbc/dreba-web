FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY dreba.conf /etc/nginx/conf.d/


WORKDIR /usr/share/nginx/html
COPY dist/ .

