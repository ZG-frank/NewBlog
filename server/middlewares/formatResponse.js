
formatResponse = (ctx, data) => {
    ctx.body = {
        code: data.code,
        message: data.message,
        data: data.data,
        space: data.space
    };
}

module.exports = formatResponse;