const http = require('http');

http.createServer((req, res) => {
    // 服务端：被请求时返回 'hello world'
    res.end('hello world');
}).listen(3001);