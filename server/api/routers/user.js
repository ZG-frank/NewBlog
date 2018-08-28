const userServices = require('../../services/user');

userRouter = (router) => {
    router
        .get('/user', function(ctx) {
            ctx.response.body = '<h1>hello user</h1>';
        })
        // .get('/api/articles', userServices.getAllArticles)
        // .post('/articles', userServices.createArticle)
        .post('/user/create', userServices.create)
        .post('/user/login', userServices.login)
        .post('/user/logout', userServices.logout)
        .delete('/user/deleteById', userServices.deleteById)
}

module.exports = userRouter;
