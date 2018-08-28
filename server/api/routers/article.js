// import verify from '../../middleware/verify.js';
const verify = require('../../middlewares/vetify');
const articleServices = require('../../services/article');

articleRouter = (router) => {
    router
        .get('/', function(ctx) {
            ctx.response.body = '<h1>hello Koa</h1>';
        })
        .get('/article/getById/:id?', articleServices.getById)
        // .post('/articles', articleController.createArticle)
        .post('/article/create', articleServices.create)
        .put('/article/update', articleServices.update)
        .put('/article/publish', articleServices.publish)
        .delete('/article/deleteById/:id', articleServices.deleteById)
}


module.exports = articleRouter;
