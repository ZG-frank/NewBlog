const Article = require('../models/article');
const response = require('../middlewares/formatResponse');
// import md5 from 'md5';
const jwt = require('koa-jwt');
const config = require('../configs/');

create = async (ctx) => {
    let body = ctx.request.body;
    console.log(ctx.request,body);

    let title = body.title;
    let content = body.content;
    let abstract = body.abstract;
    let isPublished = body.isPublished;
    let tag = body.tag;
    let createdTime = new Date();
    let modifiedTime = new Date();
    let commentCount = 0;

    checkValue(title, ctx, '标题');
    checkValue(content, ctx, '内容');
    checkValue(abstract, ctx, '摘要');
    // 简化
    // if (!title) {
    //     ctx.throw(402, {
    //         code: 13,
    //         data: null,
    //         message: '标题不能为空',
    //         space: 50
    //     });
    // }
    // if (!content) {
    //     ctx.throw(402, {
    //         code: 13,
    //         data: null,
    //         message: '文章内容不能为空',
    //         space: 50
    //     });
    // }
    // if (!abstract) {
    //     ctx.throw(402, {
    //         code: 13,
    //         data: null,
    //         message: '摘要不能为空',
    //         space: 50
    //     });
    // }

    let article = new Article({
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

checkValue = (value, ctx, title) => {
    if (!value) {
        // ctx.status = 402;
        // response(ctx, {
        //     code: 13,
        //     data: null,
        //     message: `${title}不能为空`,
        //     space: 50
        // });
        
        // return;
        ctx.type = 'application/json';
        ctx.assert(value, 402, {
            code: 13,
            data: null,
            message: `${title}不能为空`,
            space: 50
        })

        // ctx.type = 'application/json';
        // ctx.throw(402, {
        //     code: 13,
        //     data: null,
        //     message: `${title}不能为空`,
        //     space: 50
        // });
    }
}

getById = async (ctx) => {
    let id = ctx.params.id;

    checkValue(id, ctx, 'id');
    // if (!id) {
    //     ctx.throw(402, {
    //         code: 13,
    //         data: null,
    //         message: 'id不能为空',
    //         space: 50
    //     });
    // }

    let getResult = await Article.findById(id).catch(err => {
        if (err.name === 'CastError') {
            ctx.throw(402, {
                code: 17,
                data: null,
                message: 'id不存在',
                space: 50
            });
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

deleteById = async (ctx) => {
    let id = ctx.params.id;

    checkValue(id, ctx, 'id');

    let result = await Article.findByIdAndRemove(id).catch(err => {
        if (err.name === 'CastError') {
            ctx.throw(402, {
                code: 17,
                data: null,
                message: 'id不存在',
                space: 50
            });
        } else {
            this.throw(500, '服务器内部错误');
        }
    });

    response(ctx, {
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
            ctx.throw(402, {
                code: 17,
                data: null,
                message: 'id不存在',
                space: 50
            });
        } else {
            ctx.throw(500, '服务器内部错误');
        }
    });

    response(ctx, {
        code: 1,
        data: article,
        message: null,
        space: 50
    });
}

module.exports = {
    create,
    getById,
    deleteById,
    update
}