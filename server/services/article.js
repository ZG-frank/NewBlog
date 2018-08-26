const Article = require('../models/article');
const response = require('../middlewares/formatResponse');
// import md5 from 'md5';
const jwt = require('koa-jwt');
// const config = require('../configs/');

create = async (ctx) => {
    let body = ctx.request.body;
    console.log(ctx.request,body);

    let title = body.title,
        content = body.content,
        abstract = body.abstract,
        pathName = body.pathName,
        isPublic = body.isPublic,
        tags = body.tags,
        status = body.status,
        allowComment = body.allowComment,
        createdAt = new Date(),
        updatedAt = new Date(),
        viewNum = 0,
        commentNum = 0;

    response.checkValue(title, ctx, '标题');
    response.checkValue(pathName, ctx, '查找路径');
    response.checkValue(content, ctx, '内容');
    response.checkValue(abstract, ctx, '摘要');

    let newArticle = new Article({
        title,
        content,
        abstract,
        pathName,
        tags,
        status,
        isPublic,
        viewNum,
        commentNum,
        allowComment,
        createdAt,
        updatedAt
    });

    let createResult = await newArticle.save().catch(err => {
        response.responseSysError(ctx);
    });

    // await Article.populate(createResult, { path: 'tag' }, function (err, result) {
    //     createResult = result;
    //     console.log(result)
    // });

    console.log('文章创建成功');

    response.responseSuccess(ctx, {
        data: createResult,
        message: null
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

// 获取文章列表
getArticles = async (ctx) => {
    let body = ctx.request.body;

    let getResult = await Article.findById(id).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 17,
                data: null,
                message: '没有结果'
            });
        } else {
            response.responseSysError(ctx);
        }
    });

    console.log('文章查询成功');

    response.responseSuccess(ctx, {
        data: getResult,
        message: null
    });
}

// 根据id获取文章
getById = async (ctx) => {
    let id = ctx.params.id;

    let getResult = await Article.findById(id).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 17,
                data: null,
                message: 'id不存在'
            });
        } else {
            response.responseSysError(ctx);
        }
    });

    console.log('文章查询成功');

    response.responseSuccess(ctx, {
        data: getResult,
        message: null
    });
}

deleteById = async (ctx) => {
    let id = ctx.params.id;

    let result = await Article.findByIdAndRemove(id).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 17,
                data: null,
                message: 'id不存在'
            });
        } else {
            response.responseSysError(ctx);
        }
    });

    response.responseSuccess(ctx, {
        data: null,
        message: '删除成功'
    });
}


update = async (ctx) => {
    let body = ctx.request.body;

    let newData = {
        ...body,
        modifiedTime: new Date()
    };

    response.checkValue(body.title, ctx, '标题');
    response.checkValue(body.content, ctx, '内容');
    response.checkValue(body.abstract, ctx, '摘要');

    let article = await Article.findByIdAndUpdate(id, {$set: newData}).catch(err => {
        if (err.name === 'CastError') {
            response.responseError(ctx, 402, {
                code: 17,
                data: null,
                message: 'id不存在',
                space: 50
            });
        } else {
            response.responseSysError(ctx);
        }
    });

    response.responseSuccess(ctx, {
        data: article,
        message: null
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
            response.responseSysError(ctx);
        }
    });

    response.responseSuccess(ctx, {
        data: article,
        message: null
    });
}

module.exports = {
    create,
    getById,
    deleteById,
    update,
    publish
}