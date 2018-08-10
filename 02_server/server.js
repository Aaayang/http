const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    if(req.url === '/') {
        let indexP = path.resolve(__dirname, 'index.html');
        fs.createReadStream(indexP).pipe(res);
    }
}).listen(3000);