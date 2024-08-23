const http = require('http');  // import http module
const { MongoClient } = require('mongodb'); // importing mongodb driver
const port = 1324;  // setting the port number on which the server will respond
const host = "localhost";  // domain for the the server will be localhost
const uri = process.env['URI_MONGO'];

console.log(uri);


const client = new MongoClient(uri);

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
        let userCredentials;

        req.on('data', chunk => {   // collecting data of request into single string
            body += chunk;
        })
        req.on('end', async () => {
            userCredentials = JSON.parse(body);
            console.log(userCredentials);
            const db = client.db("todo-list");  // database 
            const authColl = db.collection('auth'); // collection

            if (userCredentials.pr === "signup") {
                try {
                    const isPresent = await authColl.findOne({ uname: userCredentials.name })

                    if (isPresent) {
                        console.log('if block');
                        res.writeHead(200, header);
                        res.end(JSON.stringify({ res: "user present" }));
                    }
                    else {
                        try {
                            authColl.insertOne({ uname: userCredentials.name, pass: userCredentials.pass })
                        }
                        finally {
                            res.writeHead(200, header);
                            res.end(JSON.stringify({ res: "user created" }));
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                    res.writeHead(204, header);
                    res.end(JSON.stringify({}));
                }
            }
            else if (userCredentials.pr === "login") {
                try {
                    const isPresent = await authColl.findOne({
                        "uname": `${userCredentials.user}`,
                        "pass": `${userCredentials.pass}`
                    })
                    

                    if (isPresent) {
                        res.writeHead(200, header);
                        res.end(JSON.stringify({ res: "login success" }));
                    }
                    else {
                        res.writeHead(200, header);
                        res.end(JSON.stringify({ res: "user not preset" }));
                    }
                }
                catch (e) {
                    console.error(e);
                    res.writeHead(204, header);
                    res.end(JSON.stringify({}));
                }
            }
        });
    }
    else {
        res.writeHead(204, header);
        res.end(JSON.stringify({ res: "Not okay" }));
    }
}

const server = http.createServer(serverReq); // createServer is the method of the 

server.listen(port, host, () => {
    console.log(`Data Server is running at port:${port}`);
})