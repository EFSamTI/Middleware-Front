export const environment = {
    production: false,
    keycloak: {
        authority: 'https://integrador.eurofish.com.ec:8443',
        redirectUri: 'http://localhost:4200/admin',
        postLogoutRedirectUri: 'http://localhost:4200',
        realm: 'EU-AUTH-SERVER-DEV',
        clientId: 'EU-FRONTEND-ADMIN-DEV'
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
    api: {
        uri: 'https://integrador.eurofish.com.ec:8491/v1/api'
    }
};