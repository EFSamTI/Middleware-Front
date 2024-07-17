# MiddlewareAdmin

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

Run `ng build -c production` for production.

## .env
```
AUTHOTITY=https://integrador.eurofish.com.ec:8443
REDIRECT_URL=https://integrador.eurofish.com.ec:443/admin
POST_LOGOUT_REDIRECT_URL=https://integrador.eurofish.com.ec:443
REALM=EU-AUTH-SERVER-DEV
CLIENT_ID=EU-FRONTEND-ADMIN
API_URL=https://integrador.eurofish.com.ec:8491/v1/api
```

## nginx.config
```
server {
    listen 80;
    listen 443 ssl;
    server_name integrador.eurofish.com.ec;
    ssl_certificate /etc/nginx/certs/eurofish_com_ec.pem;
    ssl_certificate_key /etc/nginx/certs/eurofish.key;
}
```

## Dockerfile
```dockerfile
FROM nginx

COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY /certs /etc/nginx/certs
COPY middleware-admin /etc/nginx/html

EXPOSE 80
EXPOSE 443
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
            - "80:80"
            - "443:443"
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
