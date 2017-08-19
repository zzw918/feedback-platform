let express = require('express')

// 使用代理中间件
let proxyMiddleware = require('http-proxy-middleware')
let path = require('path')
let app = express()

// 用于解析post请求的body
let bodyParser = require("body-parser");
let server = require('http').Server(app);

// 通过重写api代理到9000端口（即管理员端的端口）
let proxyTable = {
        '/api': {
              target: 'http://127.0.0.1:9000', // 本地node服务器
              changeOrigin: true,
              secure: false,
              pathRewrite: {
                   '^/api/': '/'
              }
          }
      };

// proxy api requests
Object.keys(proxyTable).forEach((context) => {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 注意： 使用bodyParser一定要是在代理服务器使用之后。
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// node你服务器使用的静态文件
app.use('/', express.static('./www'))

// 开启node后台服务器
console.log('> Starting dev server...')
const port = '3000';
server.listen(port, () => {
	console.log('The server is listening at localhost：' + port)
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname,  '../www/index.html'))
})

