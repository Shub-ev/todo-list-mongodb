const http = require('http');
const host = 'localhost';
const port = 1324;

const requestListener = function (req, res) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': 2592000,
    }
    if (req.method === 'POST') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    res.writeHead(200, headers);
    res.end("My first server");
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log("Server running at port 1324");
})