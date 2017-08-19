let express = require('express');
let webpack = require('webpack');
let path = require('path');
let uuidv1 = require('uuid/v1');

let app = express();
let bodyParser = require("body-parser");
let server = require('http').Server(app);

let route = require('../router/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// node你服务器使用的静态文件
app.use('/', express.static('./www'));
app.use('/', route);

// 开启node后台服务器
console.log('> Starting dev server now...');
const port = '9000';

server.listen(port, () => {
    console.log('The server is listening at localhost：' + port);
    console.log('随机uuid字符串', uuidv1());
});

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../www/index.html'));
});