const Koa = require('koa');
const config = require('./configs');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

const Router = require('koa-router');
// const routerInfo = require('koa-router')();

const App = new Koa();
const router = new Router();

mongoose.connect(config.mongodb.url, config.mongodbSecret);
mongoose.connection.on('error', console.error);
mongoose.connect('mongodb://127.0.0.1/Blog');


const first = (Context) => {
    if (Context.request.path === '/'){
		Context.response.body = '<h1>hello Koa</h1>';
	}
	if (Context.request.path === '/admin'){
		Context.response.body = '<p>admin-frankzgzhou</p>';
	}
};

// console.log(api,api())
// App.use(api());
// App.use(routerInfo.routes());
// App.use(first);

// router.get('/', (ctx, next) => {
// 	ctx.response.body = '<h1>hello Koa</h1>';
// });
App.use(bodyParser());
App
    .use(api.routes())
    .use(api.allowedMethods());

// create server
App.listen(config.app.port, () => {
    console.log('The server is running at http://localhost:' + config.app.port);
});