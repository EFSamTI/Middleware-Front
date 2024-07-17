# MiddlewareAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## .env
```
AUTHOTITY=https://integrador.eurofish.com.ec:8443
REDIRECT_URL=https://integrador.eurofish.com.ec:443/admin
POST_LOGOUT_REDIRECT_URL=https://integrador.eurofish.com.ec:443
REALM=EU-AUTH-SERVER-DEV
CLIENT_ID=EU-FRONTEND-ADMIN
API_URL=https://integrador.eurofish.com.ec:8491/v1/api
```

## Dockerfile
```dockerfile
FROM node:22.4.1-alpine3.20 as build-step
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apk add --no-cache bash

RUN npm install -g npm@10.8.2
RUN npm install -g @angular/cli@18.1.0

COPY frontend /usr/src/app
```

## docker-compose
```dockerfile
services:
    angular:
        container_name: web-admin
        build:
            context: .
        restart: unless-stopped
        ports:
            - "443:4200"
        command: bash -c "npm install && ng serve --host 0.0.0.0 --port 443 --public-host integrador.eurofish.com.ec --ssl true --ssl-cert src/assets/certs/eurofish_com_ec.pem --ssl-key src/assets/certs/eurofish.key --disable-host-check"
        environment:
            - AUTHOTITY=${AUTHOTITY}
            - REDIRECT_URL=${REDIRECT_URL}
            - POST_LOGOUT_REDIRECT_URL=${POST_LOGOUT_REDIRECT_URL}
            - REALM=${REALM}
            - CLIENT_ID=${CLIENT_ID}
            - API_URL=${API_URL}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
