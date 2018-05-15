const Koa = require('koa')
const App = new Koa();

const first = (Context) => {
    if (Context.request.path === '/'){
		Context.response.body = '<h1>hello Koa</h1>';
	}
	if (Context.request.path === '/admin'){
		Context.response.body = '<p>admin-frankzgzhou</p>';
	}

};

App.use(first);
App.listen(8080);