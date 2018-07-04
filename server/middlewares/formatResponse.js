
responseSuccess = (ctx, data) => {
    ctx.body = {
        code: data.code,
        message: data.message,
        data: data.data,
        space: data.space
    };
}

responseError = (ctx, status, data) => {
    ctx.throw(status, JSON.stringify({
        code: data.code,
        message: data.message,
        data: data.data,
        space: data.space
    }));
}

checkValue = (value, ctx, title) => {
    ctx.type = 'application/json';

    ctx.assert(value, 402, JSON.stringify( {
        code: 13,
        data: null,
        message: `${title}不能为空`,
        space: 50
    }));
}

module.exports = {
    responseSuccess,
    responseError,
    checkValue
};