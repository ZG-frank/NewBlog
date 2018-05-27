const fs = require('fs');

let config = {
    app: {
        port: process.env.PORT || 8080,
        baseApi: '/api'
    },
    mongodb: {
        url: process.env.DB_URL || 'mongodb://localhost:27017/blog'
    },
    jwt: {
        secret: 'frankzhou'
    },
    mongodbSecret: {
        user: 'frank',
        pass: 'frank1984'
    },
    admin: {
        username: 'admin1984',
        password: 'frank1984'
    },
}

if (fs.existsSync(__dirname + '/myConfig.js')) {
    config = Object.assign(config, require('./private.js'));
}

module.exports = config;