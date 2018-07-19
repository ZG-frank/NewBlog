// import verify from '../../middleware/verify.js';
const articleServices = require('../../services/article');

articleRouter = (router) => {
    router
        .get('/', function(ctx) {
            ctx.response.body = '<h1>hello Koa</h1>';
        })
        .get('/article/getById', articleServices.getById)
        // .post('/articles', articleController.createArticle)
        .put('/article/create', articleServices.create)
        .post('/article/update', articleServices.update)
        .delete('/article/deleteById', articleServices.deleteById)
}


module.exports = articleRouter;
