
const http = require('http');
const fs = require('fs');
const os = require('os');

const localname = 'localhost';
const port = 2000;

const server = http.createServer((req, res) => {

    let currentOS = {
        name: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        release: os.release(),
        type: os.type(),
        numberOfCPUs: os.cpus().length,
        networkInterfaces: os.networkInterfaces(),
        uptime: os.uptime()
    }
    
    console.log(currentOS);

    async function saveInfo(currentOS) {
        fs.writeFile('./osinfo.json', JSON.stringify(currentOS), (err) => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Your OS info has been saved successfully!');
            console.log('Your OS info has been saved successfully!')
            if (err) throw err;
        });
    }

    

    let htmlFile = '';
    switch (req.url) {
        case '/':
            htmlFile = 'pages/index.html';
            saveInfo(currentOS);
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