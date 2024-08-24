const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 1324;
const host = "localhost";
const uri = "mongodb+srv://admin:admin@01-todo-list.2uj4qaj.mongodb.net/?retryWrites=true&w=majority&appName=01-todo-list";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    console.log("File hit")
});

app.post('/api/auth', async (req, res) => {
    console.log("POST hit")
    const header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    const userCredentials = req.body;

    try {
        const db = client.db("todo-list");
        const authColl = db.collection('auth');

        if (userCredentials.pr === "signup") {
            const isPresent = await authColl.findOne({ uname: userCredentials.name });

            if (isPresent) {
                res.status(200).json({ res: "user present" });
            } else {
                await authColl.insertOne({ uname: userCredentials.name, pass: userCredentials.pass });
                res.status(200).json({ res: "user created" });
            }
        } else if (userCredentials.pr === "login") {
            const isPresent = await authColl.findOne({
                uname: userCredentials.user,
                pass: userCredentials.pass
            });

            if (isPresent) {
                res.status(200).json({ res: "login success" });
            } else {
                res.status(200).json({ res: "user not present" });
            }
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ res: "server error" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});
