const User = require('../models/user');
const response = require('../middlewares/formatResponse');
const jwt = require('koa-jwt');
const config = require('../configs/');

login = async (ctx) => {
    let body = ctx.request.body;

    let username = body.username;
    let secret = body.secret;
    
    let getResult = await User.findById(id).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 17,
                data: null,
                message: 'id不存在',
                space: 50
            });
        } else {
            response.responseError(ctx, 500, {
                code: 17,
                data: null,
                message: '服务器内部错误',
                space: 50
            });
        }
    });

    console.log('用户查询成功');

    response.responseSuccess(ctx, {
        code: 1,
        data: getResult,
        message: null,
        space: 50
    });
}

create = async (ctx) => {
    let body = ctx.request.body;

    let username = body.username;
    let secret = body.secret;
    let createdTime = new Date();
    let modifiedTime = new Date();

    checkValue(username, ctx, '名字');
    checkValue(secret, ctx, '密码');

    let article = new Article({
        username,
        secret,
        createdTime,
        modifiedTime,
    });

    let createResult = await User.save().catch(err => {
        response.responseError(ctx, 500, {
            code: 17,
            data: null,
            message: '服务器内部错误',
            space: 50
        });
    });

    await User.populate(createResult, function (err, result) {
        createResult = result;
    });

    console.log('用户创建成功');

    response.responseSuccess(ctx, {
        code: 1,
        data: createResult,
        message: null,
        space: 50
    });
}

getById = async (ctx) => {
    let id = ctx.params.id;

    checkValue(id, ctx, 'id');

    let getResult = await User.findById(id).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 17,
                data: null,
                message: 'id不存在',
                space: 50
            });
        } else {
            response.responseError(ctx, 500, {
                code: 17,
                data: null,
                message: '服务器内部错误',
                space: 50
            });
        }
    });

    console.log('用户查询成功');

    response.responseSuccess(ctx, {
        code: 1,
        data: getResult,
        message: null,
        space: 50
    });
}

deleteById = async (ctx) => {
    let id = ctx.params.id;

    checkValue(id, ctx, 'id');

    let result = await Article.findByIdAndRemove(id).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 17,
                data: null,
                message: 'id不存在',
                space: 50
            });
        } else {
            response.responseError(ctx, 500, {
                code: 17,
                data: null,
                message: '服务器内部错误',
                space: 50
            });
        }
    });

    response.responseSuccess(ctx, {
        code: 1,
        data: null,
        message: null,
        space: 50
    });
}

update = async (ctx) => {
    let body = ctx.request.body;

    let newData = {
        ...body,
        modifiedTime: new Date()
    }

    let title = body.title;
    let content = body.content;
    let abstract = body.abstract;
    let tag = body.tag;
    let modifiedTime = new Date();

    checkValue(title, ctx, '标题');
    checkValue(content, ctx, '内容');
    checkValue(abstract, ctx, '摘要');

    let article = await Article.findByIdAndUpdate(id, {$set: body}).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 17,
                data: null,
                message: 'id不存在',
                space: 50
            });
        } else {
            response.responseError(ctx, 500, {
                code: 17,
                data: null,
                message: '服务器内部错误',
                space: 50
            });
        }
    });

    response.responseSuccess(ctx, {
        code: 1,
        data: article,
        message: null,
        space: 50
    });
}

module.exports = {
    login,
    create,
    getById,
    deleteById,
    update
}