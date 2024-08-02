const http = require('http');  // import http module
const mongodb = require('mongodb'); // importing mongodb driver
const port = 1324;  // setting the port number on which the server will respond
const host = "localhost";  // domain for the the server will be localhost
const uri = process.env['URI_MONGO'];

console.log(uri);


const serverReq = (req, res) => {   // creating a function (call back) for createServer() method of http module which acceps 2 paras
    // 1. req which is the request object 
    // 2. res response object
    const header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    if (req.method === "POST") {     // checking if req is of POST method
        let body = '';

        req.on('data', chunk => {   // collecting data of request into single string
            body += chunk;
        })
        req.on('end', () => {
            const data = JSON.parse(body);
            console.log(data);
        })

        res.writeHead(200, header);
        res.end(JSON.stringify({ res: "Okay" }));
    }
    else {
        res.writeHead(204, header);
        res.end(JSON.stringify({ res: "Not okay" }));
    }
}

const server = http.createServer(serverReq); // createServer is the method of the 

server.listen(port, host, () => {
    console.log(`Server is running at port:${port}`);
})