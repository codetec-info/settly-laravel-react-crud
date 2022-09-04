# Laravel React Crud

> This project runs with Laravel version 9.27 & React 18.0.2.

## Getting started

``` bash
# install dependencies
composer install
npm install

# create .env file and generate the application key
cp .env.example .env
php artisan key:generate

# migrate to database with seeds
php artisan migrate --seed
```