// import * as $ from '../../controllers/articles_controller.js';
// import verify from '../../middleware/verify.js';
// const router = require('koa-router')();
const articleController = require('../../controllers/articles.js');

articleRouter = (router) => {
    router
        .get('/', function(ctx) {
            ctx.response.body = '<h1>hello Koa</h1>';
        })
        .get('/api', function(ctx) {
            ctx.response.body = '<h1>hello Api</h1>';
        })
        // .get('/api/articles', articleController.getAllArticles)
        // .post('/articles', articleController.createArticle)
        .post('/api/article/create', articleController.create)
}

module.exports = articleRouter;
