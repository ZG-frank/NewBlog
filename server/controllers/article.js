const Article = require('../models/article');
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

    if (title === '') {
        ctx.throw(402, '标题不能为空');
    }
    if (content === '') {
        ctx.throw(402, '文章内容不能为空');
    }
    if (abstract === '') {
        ctx.throw(402, '摘要不能为空');
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

    ctx.body = {
        success: true,
        article: createResult,
    };

}

getById = async (ctx) => {

}

module.exports = {
    create,
    getById
}