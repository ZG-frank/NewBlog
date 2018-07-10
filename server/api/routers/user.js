const userController = require('../../services/user');

userRouter = (router) => {
    router
        .get('/user', function(ctx) {
            ctx.response.body = '<h1>hello user</h1>';
        })
        // .get('/api/articles', articleController.getAllArticles)
        // .post('/articles', articleController.createArticle)
        // .post('/user/create', userController.create)
}

module.exports = userRouter;
