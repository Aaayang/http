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
            if(req.headers['if-modified-since'] === stat.ctime.toUTCString()) {
                res.statusCode = 304;
                res.end();
            } else {
                res.setHeader('Last-Modified', stat.ctime.toUTCString());

                res.setHeader('Content-Type', mime.getType(fileP) + ";charset=utf8");
                fs.createReadStream(fileP).pipe(res);
            }
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
}).listen(3001);