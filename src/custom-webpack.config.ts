const { EnvironmentPlugin } = require('webpack');

require('dotenv').config();

module.exports = {
    output: {
        crossOriginLoading: 'anonymous'
    },
    plugins: [
        new EnvironmentPlugin([
            'AUTHOTITY',
            'REDIRECT_URL',
            'POST_LOGOUT_REDIRECT_URL',
            'REALM',
            'CLIENT_ID'
        ])
    ]
}