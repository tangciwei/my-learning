const http = require('http');

http.createServer((req, res) => {
    http.get('http://bj.meituan.com');
    res.end('hello');
}).listen(8000, () => {
    console.log('server is listening: ' + 8000);
});
