export const environment = {
    production: false,
    keycloak: {
        authority: 'https://integrador.eurofish.com.ec:8443',
        // authority: 'https://gateway.eurofish.com.ec:8443',
        redirectUri: 'http://localhost:4200/admin',
        postLogoutRedirectUri: 'http://localhost:4200',
        // realm: 'Pretius-Keycloak-FE-Integration',
        // clientId: 'keycloak-angular-integration-tutorial',
        realm: 'EU-AUTH-SERVER-DEV',
        clientId: 'EU-FRONTEND-ADMIN'
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
    api: {
        // uri: 'http://localhost:8091/v1/api',
        uri: 'https://integrador.eurofish.com.ec:8491/v1/api'
    }
};