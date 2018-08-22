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
        message: `${title}不能为空`,
        space: 50
    }));
}

module.exports = {
    responseSuccess,
    responseError,
    responseSysError,
    checkValue
};