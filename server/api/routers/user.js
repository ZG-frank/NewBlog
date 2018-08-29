const userServices = require('../../services/user');
const verify = require('../../middlewares/vetify');

userRouter = (router) => {
    router
        .get('/user', verify, function(ctx) {
            ctx.response.body = '<h1>hello user</h1>';
        })
        .post('/user/login', userServices.login)
        .post('/user/logout', verify, userServices.logout)
        .post('/user/create', verify,userServices.create)
        .get('/user/getById', verify,userServices.getById)
        .put('/user/update', verify,userServices.update)
        .delete('/user/deleteById', verify,userServices.deleteById)
}

module.exports = userRouter;
