const jwt = require('jsonwebtoken');
const config = require('../configs');
const response = require('../middlewares/formatResponse');

let secret = config.token.secret;
let expiresIn = config.token.expiresIn;

module.exports = {
    createToken(userinfo) {
        let token = jwt.sign(userinfo, secret, { expiresIn });
        return token;
    },

    verifyToken(ctx, token) {
        if (!token) {
            return {
                status: false,
                message: 'No token'
            };
        }

        try {
            let result = jwt.verify(token, secret);
            return {
                status: result,
                message: 'Token verify success'
            };
        } catch (err) {
            if ('TokenExpiredError' === err.name) {
                return {
                    status: false,
                    message: 'Token expired'
                };
            }

            return {
                status: false,
                message: 'Token verify failed'
            };
        }
    }
}