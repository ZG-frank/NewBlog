const jwt = require('jsonwebtoken');
const config = require('../configs');

let secret = config.token.secret;
let expiresIn = config.token.expiresIn;

module.exports = {
    createToken(userinfo) {
        let token = jwt.sign(userinfo, secret, { expiresIn });
        return token;
    },

    verifyToken(token) {
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
                    message: '状态过期，请重新登录'
                };
            }

            return {
                status: false,
                message: 'Token verify failed'
            };
        }
    }
}