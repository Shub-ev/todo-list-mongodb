const http = require('http');
const host = 'localhost';
const port = 1324;

const requestListener = function (req, res) {
    console.log(req);
    res.writeHeader(200);
    res.end("My first server");
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log("Server running at port 1324");
})