# FROM nginx:alpine

# COPY ./build/ /var/www

# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# ENTRYPOINT ["nginx","-g","daemon off;"]

FROM node:18-alpine3.18 AS build-stage

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /usr/app/build/ /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]