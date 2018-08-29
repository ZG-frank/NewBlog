// import verify from '../../middleware/verify.js';
const verify = require('../../middlewares/vetify');
const articleServices = require('../../services/article');

articleRouter = (router) => {
    router
        .get('/', function(ctx) {
            ctx.response.body = '<h1>hello Koa</h1>';
        })
        .get('/article/getById/:id?', articleServices.getById)
        .get('/article/list/', articleServices.getList)
        // .post('/articles', articleController.createArticle)
        .post('/article/create', verify, articleServices.create)
        .put('/article/update', verify, articleServices.update)
        .put('/article/publish', verify, articleServices.publish)
        .delete('/article/deleteById/:id', verify, articleServices.deleteById)
}


module.exports = articleRouter;
