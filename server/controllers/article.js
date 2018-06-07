const Article = require('../models/article');
const response = require('../middlewares/formatResponse');
// import md5 from 'md5';
const jwt = require('koa-jwt');
const config = require('../configs/');

create = async (ctx) => {
    let body = ctx.request.body;
    console.log(ctx.request,body);

    const title = body.title;
    const content = body.content;
    const abstract = body.abstract;
    const isPublished = body.isPublished;
    const tag = body.tag;
    const createdTime = new Date();
    const modifiedTime = new Date();
    const commentCount = 0;

    if (!title) {
        ctx.throw(402, {
            code: 13,
            data: null,
            message: '标题不能为空',
            space: 50
        });
    }
    if (!content) {
        ctx.throw(402, {
            code: 13,
            data: null,
            message: '文章内容不能为空',
            space: 50
        });
    }
    if (!abstract) {
        ctx.throw(402, {
            code: 13,
            data: null,
            message: '摘要不能为空',
            space: 50
        });
    }

    const article = new Article({
        title,
        content,
        abstract,
        isPublished,
        tag,
        commentCount,
        createdTime,
        modifiedTime,
    });

    let createResult = await article.save().catch(err => {
        ctx.throw(500, '服务器内部错误');
    });

    await Article.populate(createResult, { path: 'tag' }, function (err, result) {
        createResult = result;
        console.log(result)
    });

    console.log('文章创建成功');

    // ctx.body = {
    //     success: true,
    //     article: createResult,
    // };
    response(ctx, {
        code: 1,
        data: createResult,
        message: null,
        space: 50
    });
}

getById = async (ctx) => {
    const id = ctx.params.id;

    if (!id) {
        ctx.throw(402, 'id不能为空');
    }

    let getResult = await article.findById().catch(err => {
        if (err.name === 'CastError') {
            ctx.throw(402, 'id不存在');
        } else {
            ctx.throw(500, '服务器内部错误');
        }
    });

    console.log('文章查询成功');

    // ctx.body = {
    //     success: true,
    //     article: getResult,
    // };

    response(ctx, {
        code: 1,
        data: getResult,
        message: null,
        space: 50
    });
}

module.exports = {
    create,
    getById
}