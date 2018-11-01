const http = require('http');

http.createServer((req, res) => {
    res.end('hello');
}).listen(8000, () => {
    console.log('server is listening: ' + 8000);
});
