const User = require('../models/user');
const response = require('../middlewares/formatResponse');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const config = require('../configs/');
const tokenService = require('../services/token');

login = async (ctx, next) => {
    let body = ctx.request.body;

    let username = body.username,
        password = body.password;

    response.checkValue(username, ctx, '名字');
    response.checkValue(password, ctx, '密码');

    let result = await User.findOne({ username }).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 13,
                data: null,
                message: '用户不存在'
            });
        } else {
            response.responseSysError(ctx);
        }
    });

    if (md5(password) !== result.password) {
        response.responseError(ctx, 402, {
            code: 13,
            data: null,
            message: '密码不正确'
        });
    }

    let token = tokenService.createToken({
        uid: result._id,
        name: username,
        timestamp: (new Date()).valueOf()
    });

    console.log('用户登录成功');

    response.responseSuccess(ctx, {
        code: 1,
        data: token,
        message: null
    });
}

logout = (ctx, next) => {
    let token = ctx.request.headers.authorization;
    console.log(ctx.request.headers)
    if (!token) {
        response.responseError(ctx, 402, {
            code: 0,
            data: null,
            message: 'Token verify failed'
        });
    }
  
    const result = tokenService.verifyToken(token);
    if (result.status === false) {
        response.responseError(ctx, 402, {
            code: 0,
            data: null,
            message: result.message
        });
    } else {
        response.responseSuccess(ctx, {
            code: 1,
            data: null,
            message: 'Token deleted'
        });
    }
}

create = async (ctx) => {
    let body = ctx.request.body;

    let username = body.username;
        nickname = body.nickname,
        password = body.password,
        email = body.email,
        avatar = body.avatar,
        createdAt = new Date(),
        updatedAt = new Date();

    response.checkValue(username, ctx, '名字');
    response.checkValue(password, ctx, '密码');

    const isExit = await User.findOne({ username });

    if (isExit) {
        response.responseError(ctx, 402, {
            code: 13,
            data: null,
            message: '用户已存在'
        });
    }

    let newUser = new User({
        username,
        nickname,
        password: md5(password),
        email,
        avatar,
        createdAt,
        updatedAt,
    });

    let createResult = await newUser.save().catch(err => {
        response.responseSysError(ctx);
    });

    // await User.populate(createResult, function (err, result) {
    //     createResult = result;
    // });

    console.log('用户创建成功');

    response.responseSuccess(ctx, {
        code: 1,
        data: createResult,
        message: null
    });
}

getById = async (ctx) => {
    let id = ctx.params.id;

    response.checkValue(id, ctx, 'id');

    let getResult = await User.findById(id).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 13,
                data: null,
                message: 'id不存在'
            });
        } else {
            response.responseSysError(ctx);
        }
    });

    console.log('用户查询成功');

    response.responseSuccess(ctx, {
        code: 1,
        data: getResult,
        message: null
    });
}

deleteById = async (ctx) => {
    let id = ctx.request.body.id;

    response.checkValue(id, ctx, 'id');

    let result = await User.findByIdAndRemove(id).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 13,
                data: null,
                message: 'id不存在'
            });
        } else {
            response.responseSysError(ctx);
        }
    });

    response.responseSuccess(ctx, {
        code: 1,
        data: null,
        message: '删除成功'
    });
}

update = async (ctx) => {
    let body = ctx.request.body;

    response.checkValue(body.id, ctx, 'id');
    response.checkValue(body.nickname, ctx, '昵称');
    response.checkValue(body.password, ctx, '密码');
    response.checkValue(body.email, ctx, '邮箱');

    let newData = {
        ...body,
        updatedAt: new Date()
    }

    let newUser = await User.findByIdAndUpdate(id, {$set: newData}).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 13,
                data: null,
                message: 'id不存在'
            });
        } else {
            response.responseSysError(ctx);
        }
    });

    response.responseSuccess(ctx, {
        code: 1,
        data: newUser,
        message: null
    });
}

module.exports = {
    login,
    logout,
    create,
    getById,
    deleteById,
    update
}