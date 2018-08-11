const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url, true);
    let fileP = path.join(__dirname, pathname);
    fs.stat(fileP, function (err, stat) {
        if (!err) {
            let timeStr = new Date(Date.now() + 1000 * 60).toUTCString();

            res.setHeader('Pragma', 'no-cache'); // http1.0
            res.setHeader('Expires', timeStr); // http1.0
            res.setHeader('Cache-Control', 'max-age=60') // http1.1，单位是秒

            res.setHeader('Content-Type', mime.getType(fileP) + ";charset=utf8");
            fs.createReadStream(fileP).pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
}).listen(3000);