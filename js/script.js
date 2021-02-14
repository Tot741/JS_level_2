const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url);
    // console.log(req.headers["sec-fetch-dest"]);
    let path = '.' + req.url
    const body = req.url === '/'
        ? fs.readFileSync('index.html', 'utf8')
        : fs.readFileSync(path, 'utf8')
    // let fileType = req.headers["sec-fetch-dest"];
    // if (fileType === 'image') {
    //     res.writeHead(200, { 'Content-Type': 'image/jpeg' }) 
    // };
    res.end(body);
})

const port = process.env.PORT || 3000;

server.listen(port);
console.log(`Server started on port ${port}`);
