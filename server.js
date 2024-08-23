const http = require('http');
const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const portExpress = 8080;
const portHttp = 1324;
const host = "localhost";
const uri = process.env['URI_MONGO'];
const client = new MongoClient(uri);

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const serverReq = (req, res) => {
    const header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (req.method === "POST") {
        let body = '';
        let userCredentials;

        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', async () => {
            userCredentials = JSON.parse(body);
            const db = client.db("todo-list");
            const authColl = db.collection('auth');

            if (userCredentials.pr === "signup") {
                try {
                    const isPresent = await authColl.findOne({ uname: userCredentials.name });

                    if (isPresent) {
                        res.writeHead(200, header);
                        res.end(JSON.stringify({ res: "user present" }));
                    } else {
                        try {
                            authColl.insertOne({ uname: userCredentials.name, pass: userCredentials.pass });
                        } finally {
                            res.writeHead(200, header);
                            res.end(JSON.stringify({ res: "user created" }));
                        }
                    }
                } catch (e) {
                    console.error(e);
                    res.writeHead(204, header);
                    res.end(JSON.stringify({}));
                }
            } else if (userCredentials.pr === "login") {
                try {
                    const isPresent = await authColl.findOne({
                        "uname": `${userCredentials.user}`,
                        "pass": `${userCredentials.pass}`
                    });

                    if (isPresent) {
                        res.writeHead(200, header);
                        res.end(JSON.stringify({ res: "login success" }));
                    } else {
                        res.writeHead(200, header);
                        res.end(JSON.stringify({ res: "user not present" }));
                    }
                } catch (e) {
                    console.error(e);
                    res.writeHead(204, header);
                    res.end(JSON.stringify({}));
                }
            }
        });
    } else {
        res.writeHead(204, header);
        res.end(JSON.stringify({ res: "Not okay" }));
    }
};

const httpServer = http.createServer(serverReq);

// Start both servers
httpServer.listen(portHttp, host, () => {
    console.log(`HTTP Server is running at http://${host}:${portHttp}`);
});

app.listen(portExpress, () => {
    console.log(`Express Server is running on http://localhost:${portExpress}`);
});
