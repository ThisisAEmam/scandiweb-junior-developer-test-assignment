FROM php:8-fpm

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    vim \
    unzip

RUN docker-php-ext-install pdo pdo_mysql  && docker-php-ext-enable pdo_mysql

WORKDIR /var/www
# RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli