
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

module.exports = {
    responseSuccess,
    responseError
};