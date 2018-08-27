

// export default async (ctx, next) => {
//     // console.log(ctx.get('Authorization'));
//     const authorization = ctx.get('Authorization');
//     if (authorization === '') {
//         ctx.throw(401, 'no token detected in http header \'Authorization\'');
//     }
//     const token = authorization.split(' ')[1];
//     let tokenContent;
//     try {
//         tokenContent = await jwt.verify(token, config.jwt.secret);
//     } catch (err) {
//         if ('TokenExpiredError' === err.name) {
//             ctx.throw(401, 'token expired,请及时本地保存数据！');
//         }
//         ctx.throw(401, 'invalid token');
//     }
//     console.log('鉴权成功');
//     await next();
// };

const jwt = require('jsonwebtoken');
const config = require('../configs');
const response = require('../middlewares/formatResponse');

let secret = config.token.secret;
let expiresIn = config.token.expiresIn;

const tokenService = require('../services/token')

module.exports = class {
    async beforeRestful(ctx, next) {
        const isGettingUser = ctx.url.startsWith('/api/user');
        const isGettingAdmin = ctx.url.startsWith('/api/admin/');
        const isNotGet = ctx.url.startsWith('/api/') && ctx.method !== 'GET';

        if (!isGettingAdmin && !isGettingUser && !isNotGet) {
            return next();
        }

        // const headers = ctx.request.headers;
        let token = ctx.request.headers.authorization;
        // try {
        //     token = headers['authorization'];
        // } catch (err) {
        //     return ctx.body = {
        //         status: 'fail',
        //         description: err
        //     }
        // }

        if (!token) {
            response.responseError(ctx, 402, {
                code: 0,
                data: null,
                message: 'Token verify failed'
            });
        }

        const result = tokenService.verifyToken(ctx, token);
        if (result.status === false) {
            response.responseError(ctx, 402, {
                code: 0,
                data: null,
                message: 'Token verify failed'
            });
        }

        await next();
    }
}