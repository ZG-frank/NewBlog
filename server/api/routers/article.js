// import verify from '../../middleware/verify.js';
const articleController = require('../../controllers/article');

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
        .post('/article/create', articleController.create)
}

module.exports = articleRouter;
