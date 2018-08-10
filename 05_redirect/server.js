const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const zlib = require('zlib');

http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/') {
        // 302 临时重定向
        // 301 永久重定向
        res.statusCode = 302;
        res.setHeader('Location', '/fresh');
        res.end();
    }
    
    if(req.url === '/fresh') {
        let indexP = path.resolve(__dirname, 'index.html');
        let gzip = zlib.createGzip();

        // 设置消息内容类型
        res.setHeader('Content-Type', mime.getType(indexP) + ';charset=utf8');
        // 设置压缩方式，压缩后同过浏览器 Network 你会发现文件比之前小了
        res.setHeader('Content-Encoding', 'gzip');
        // 语言类型
        res.setHeader('Content-Language', 'zh');

        fs.createReadStream(indexP).pipe(gzip).pipe(res);
    }
}).listen(3000);