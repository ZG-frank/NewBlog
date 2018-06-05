const Koa = require('koa');
const config = require('./configs');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const api = require('./api');

const App = new Koa();

mongoose.connect(config.mongodb.url, config.mongodbSecret);
mongoose.connection.on('error', console.error);
mongoose.connect('mongodb://127.0.0.1/Blog');


App.use(api());
App.use(bodyParser());


// create server
App.listen(config.app.port, () => {
    console.log('The server is running at http://localhost:' + config.app.port);
});