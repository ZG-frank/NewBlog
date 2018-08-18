const Article = require('../models/article');
const response = require('../middlewares/formatResponse');
// import md5 from 'md5';
const jwt = require('koa-jwt');
// const config = require('../configs/');

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

    let createResult = await Article.save().catch(err => {
        response.responseError(ctx, 500, {
            code: 17,
            data: null,
            message: '服务器内部错误',
            space: 50
        });
    });

    await Article.populate(createResult, { path: 'tag' }, function (err, result) {
        createResult = result;
        console.log(result)
    });

    console.log('文章创建成功');

    response.responseSuccess(ctx, {
        code: 1,
        data: createResult,
        message: null,
        space: 50
    });
}

// 检查某字段是否为空
checkValue = (value, ctx, title) => {
    console.log(value)

    ctx.assert(value, 402, JSON.stringify({
        code: 13,
        data: null,
        message: `${title}不能为空`,
        space: 50
    }));
}

// 根据id获取文章
getById = async (ctx) => {
    let id = ctx.params.id;
    let body = ctx.request.body;
    console.log(ctx.request,id,body);
    
    checkValue(id, ctx, 'id');

    let getResult = await Article.findById(id).catch(err => {
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

    console.log('文章查询成功');

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

publish = async (ctx) => {
    let body = ctx.request.body;

    let newData = {
        ...body,
        modifiedTime: new Date()
    }

    checkValue(isPublished, ctx, '是否发布');

    let article = await Article.findByIdAndUpdate(id, {$set: newData}).catch(err => {
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
    create,
    getById,
    deleteById,
    update,
    publish
}