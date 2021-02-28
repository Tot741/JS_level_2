const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url);
    let path = '.' + req.url
    const fileExtension = req.url.split('.').pop();
    switch (fileExtension) {
        case 'svg':
            res.setHeader('content-type', 'image/svg+xml');
            break;
        case 'html':
            res.setHeader('content-type', 'text/html; charset=utf-8');
            break;
        case 'css':
            res.setHeader('content-type', 'text/css');
            break;
        case 'jpg':
            res.setHeader('content-type', 'image/jpeg');
            break;
        case 'ico':
            res.setHeader('content-type', 'image/x-icon');
            break;
        case 'json':
            res.setHeader('content-type', 'application/json');
            break;
    }
    const body = req.url === '/'
        ? fs.readFileSync('index.html', 'utf8')
        : fs.readFileSync(path)
    res.end(body);
})

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server started on port ${port}`);
