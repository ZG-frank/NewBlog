// import verify from '../../middleware/verify.js';
const articleController = require('../../services/article');

articleRouter = (router) => {
    router
        .get('/', function(ctx) {
            ctx.response.body = '<h1>hello Koa</h1>';
        })
        .get('/article/getById', articleController.getById)
        // .post('/articles', articleController.createArticle)
        .put('/article/create', articleController.create)
        .post('/article/update', articleController.update)
        .delete('/article/deleteById', articleController.deleteById)
}


module.exports = articleRouter;
