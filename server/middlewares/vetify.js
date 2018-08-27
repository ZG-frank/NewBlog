import jwt from 'jsonwebtoken';
import config from '../configs/';

export default async (ctx, next) => {
    // console.log(ctx.get('Authorization'));
    const authorization = ctx.get('Authorization');
    if (authorization === '') {
        ctx.throw(401, 'no token detected in http header \'Authorization\'');
    }
    const token = authorization.split(' ')[1];
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, config.jwt.secret);
    } catch (err) {
        if ('TokenExpiredError' === err.name) {
            ctx.throw(401, 'token expired,请及时本地保存数据！');
        }
        ctx.throw(401, 'invalid token');
    }
    console.log('鉴权成功');
    await next();
};

const jwt = require('jsonwebtoken');
const config = require('../configs');
const response = require('../middlewares/formatResponse');

let secret = config.token.secret;
let expiresIn = config.token.expiresIn;

const tokenService = require('../services/token')

module.exports = {
    async beforeRestful(ctx, next) {
        const isGettingUser = ctx.url.startsWith('/api/user')
        const isGettingAdmin = ctx.url.startsWith('/admin/')
        const isNotGet = ctx.url.startsWith('/api/') && ctx.method !== 'GET'
        if (!isGettingAdmin && !isGettingUser && !isNotGet) {
            return next();
        }

        const headers = ctx.request.headers
        let token
        try {
            token = headers['authorization']
        } catch (err) {
            return ctx.body = {
                status: 'fail',
                description: err
            }
        }

        if (!token) {
            return ctx.body = {
                status: 'fail',
                message: 'Token not found'
            }
        }

        const result = tokenService.verifyToken(ctx, token);
        if (result === false) {
            return ctx.body = {
                status: 'fail',
                message: 'Token verify failed'
            }
        }
    },
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