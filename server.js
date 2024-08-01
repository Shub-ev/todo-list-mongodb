const http = require("http");
const port = 1324;
const host = "localhost";

const server = http.createServer((req, res) => {
    const headers = {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "OPTIONS, POST, GET, DELETE",
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    if(req.method === "POST"){
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        })
        req.on('end', () => {
            const data = JSON.parse(body);
            console.log(data);
        })
    }

    res.writeHead(200, headers);
    res.end();
});

server.listen(port, host, () => {
    console.log("Server runnung at port 1324");
})