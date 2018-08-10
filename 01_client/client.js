const http = require('http');

const req = http.request({
    hostname: 'localhost',
    port: 3001
}, res => {
    let arr = [];
    res.on('data', chunk => {
        arr.push(chunk);
    });
    res.on('end', () => {
        console.log(Buffer.concat(arr).toString());
    });
});

req.end();