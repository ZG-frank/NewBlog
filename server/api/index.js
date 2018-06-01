const router = require('koa-router')();
const compose = require('koa-compose');
const convert = require('koa-convert');

const config = require('../configs');

const articleController = require('../controllers/articles.js');
console.log(articleController);


router
    //  用户模块api
    .get('/', function(ctx) {
        ctx.response.body = '<h1>hello Koa1111</h1>';
    })
    .post('/api/article/create', articleController.create)         // 用户登录



module.exports = router;
