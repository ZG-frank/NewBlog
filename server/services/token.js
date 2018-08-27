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
            return false;
        }

        try {
            let result = jwt.verify(token, secret);
            return result;
        } catch (err) {
            if ('TokenExpiredError' === err.name) {
                ctx.throw(401, 'token expired,请及时本地保存数据！');
            }
            ctx.throw(401, 'invalid token');
        }
    }
}