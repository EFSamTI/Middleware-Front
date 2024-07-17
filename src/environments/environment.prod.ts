export const environment = {
    production: true,
    keycloak: {
        authority: $ENV.AUTHOTITY,
        redirectUri: $ENV.REDIRECT_URL,
        postLogoutRedirectUri: $ENV.POST_LOGOUT_REDIRECT_URL,
        realm: $ENV.REALM,
        clientId: $ENV.CLIENT_ID
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
    api: {
        uri: $ENV.API_URL
    }
};