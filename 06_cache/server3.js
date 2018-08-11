const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');
const crypto = require('crypto');

http.createServer((req, res) => {
    let { pathname } = url.parse(req.url, true);
    let fileP = path.join(__dirname, pathname);
    fs.stat(fileP, function (err, stat) {
        if (!err) {
            let hashMd5  = crypto.createHash('md5'),
                rs = fs.createReadStream(fileP);

            rs.on('data', data => {
                // 进行摘要
                hashMd5.update(data);
            });

            rs.on('end', function () {
                let abstract = hashMd5.digest('hex'); // 输出十六进制摘要
                if (req.headers['if-none-match'] === abstract) {
                    res.statusCode = 304;
                    res.end();
                } else {
                    res.setHeader('Etag', abstract);

                    res.setHeader('Content-Type', mime.getType(fileP) + ";charset=utf8");
                    fs.createReadStream(fileP).pipe(res);
                }
            });
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
}).listen(3002);