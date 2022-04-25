
const http = require('http');
const fs = require('fs');

const localname = 'localhost';
const port = 2000;

const server = http.createServer((req, res) => {
    
    let htmlFile = '';
    switch (req.url) {
        case '/':
            htmlFile = 'pages/index.html';
            break;
        case '/about':
            htmlFile = 'pages/about.html';
            break;
        default:
            htmlFile = 'pages/404.html';
    }

    if (htmlFile) {
        render(res, htmlFile);
    }
});


function render(res, htmlFile) {
    fs.stat(`./${htmlFile}`, (err, stats) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        if (stats) {
            fs.createReadStream(htmlFile).pipe(res);
        } else {
            res.statusCode = 404;
        }
    });
}
 
server.listen(port, localname, () => { 
    console.log(`Server running at http://${localname}:${port}/`);
})