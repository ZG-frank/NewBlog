/*
* @ 统一响应请求
* @ ctx  请求上下文
* @ data  自定义的消息实体对象
* @ data.code  响应返回码
* @ data.data  响应数据
* @ data.message  响应提示信息
*/ 

responseSuccess = (ctx, data) => {
    ctx.body = {
        code: 1,
        message: data.message,
        data: data.data
    };
}

responseError = (ctx, status, data) => {
    ctx.throw(status, JSON.stringify({
        code: data.code,
        message: data.message,
        data: data.data
    }));
}

responseSysError = (ctx) => {
    ctx.throw(500, JSON.stringify({
        code: 17,
        message: '服务器内部错误',
        data: null
    }));
}

checkValue = (value, ctx, title) => {
    ctx.assert(value, 402, JSON.stringify({
        code: 13,
        data: null,
        message: `${title}不能为空`
    }));
}

module.exports = {
    responseSuccess,
    responseError,
    responseSysError,
    checkValue
};