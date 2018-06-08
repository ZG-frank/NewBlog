const Router = require('koa-router');
const compose = require('koa-compose');
const convert = require('koa-convert');

const config = require('../configs');
const requireDir = require('require-dir');
const allRouters = requireDir('./routers');

console.log(allRouters, 'test');

api = () => {
    const router = new Router({
        prefix: config.app.baseApi,
    });

    Object.keys(allRouters).forEach(name => {
        if (typeof allRouters[name] === 'function') {
            allRouters[name](router)
        };
    });

    return convert.compose([
        router.routes(),
        router.allowedMethods(),
    ]);
}

module.exports = api;
