import { env } from "node:process";

export const environment = {
    production: true,
    keycloak: {
        authority: env["AUTHOTITY"],
        redirectUri: env['REDIRECT_URL'],
        postLogoutRedirectUri: env['POST_LOGOUT_REDIRECT_URL'],
        realm: env['REALM'],
        clientId: env['CLIENT_ID']
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
    api: {
        uri: env['API_URL']
    }
};