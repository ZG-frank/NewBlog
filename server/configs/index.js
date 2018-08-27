const fs = require('fs');
const env = process.env;

let config = {
    app: {
        port: env.PORT || 3000,
        baseApi: '/api'
    },
    mongodb: {
        url: env.DB_URL || 'mongodb://localhost:27017/blog'
    },
    token: {
        secret: env.tokenSecret || 'frankzhou',
        expiresIn: env.tokenExpiresIn || 3600,
    },
    mongodbSecret: {
        user: env.dbUser || 'frank',
        pass: env.dbPass || 'frank1984'
    },
    admin: {
        username: env.adminName || 'admin',
        password: env.adminPass || 'admin',
    },
}

if (fs.existsSync(__dirname + '/myConfig.js')) {
    config = Object.assign(config, require('./private.js'));
}

module.exports = config;