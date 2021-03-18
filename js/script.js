// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     let path = '.' + req.url
//     const fileExtension = req.url.split('.').pop();
//     switch (fileExtension) {
//         case 'svg':
//             res.setHeader('content-type', 'image/svg+xml');
//             break;
//         case 'html':
//             res.setHeader('content-type', 'text/html; charset=utf-8');
//             break;
//         case 'css':
//             res.setHeader('content-type', 'text/css');
//             break;
//         case 'jpg':
//             res.setHeader('content-type', 'image/jpeg');
//             break;
//         case 'ico':
//             res.setHeader('content-type', 'image/x-icon');
//             break;
//         case 'json':
//             res.setHeader('content-type', 'application/json');
//             break;
//     }
//     const body = req.url === '/'
//         ? fs.readFileSync('index.html', 'utf8')
//         : fs.readFileSync(path)
//     res.end(body);
// })

// const port = process.env.PORT || 3000;

// server.listen(port);
// console.log(`Server started on port ${port}`);

const fs = require('fs');
const express = require('express');
const bodyParser =require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('./'));
app.use(bodyParser.json());

app.get('/itemslist/:page', (req, res) => {
    const page = req.params.page;
    fs.readFile(`./database/items${page}.json`, 'utf8', (err, data) => {
        res.send(data);
    });
});

app.get('/cartlist', (req, res) => {
    fs.readFile('./database/cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/itemsincart', (req, res) => {
    const filePath = './database/cart.json'
    fs.readFile(filePath, 'utf8', (err, data) => {
        const cart = JSON.parse(data || {})
        const amountOfData = Object.keys(cart).length
        const newID = amountOfData + 1;
        const newCartItem = req.body
        console.log(newCartItem)
        // newCartItem.id = newID
        cart[newID] = newCartItem
        console.log(cart)
        fs.writeFile(filePath, JSON.stringify(cart), (err) => {
            if (err) {
                console.log(err)
            }
            res.send(cart)
        })
    })

})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

