// CREATED BY YXILD.LOL
// LICENCED UNDER GNU-PUBLIC LICENCE (v3.0)
// ANY EDITING OR COMERCIAL USAGE OF THIS SCRIPT IS ABLE TO GET DMCA'D UNLESS SPECIAL PERMISSION FROM THE OWNER

// OWNERS SOCIAL: Уxild#1930 (DISCORD)
// OWNERS SOCIAL: github.com/Yxild

const express = require('express'),
    crypto = require('crypto'),
    md5 = require('md5'),
    { MongoClient } = require('mongodb');

let MainURL = "http://localhost:3000";
let Version = "1.0.0";

const client = new MongoClient("mongodb+srv://admin:ytYwYzl4qO83ymdW@cluster0.c1hn97d.mongodb.net/?retryWrites=true&w=majority");
const database = client.db("Database").collection('Login')

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send("what r u doing here? noobie.");
});

app.get('/create', function (req, res) {
    const robloxsecureid = crypto.randomBytes(64).toString('hex');
    const key = req.header("Key");
    const username = req.header("Username");
    const password = req.header("Password");
    const email = req.header("Email");

    if (key == null) {
        console.log("Rolive : Failed to create account..");
        res.send("Account Creation Failed.. Invalid Key");

    } else if (key || robloxsecureid || username || password || email) {
        client.on('commandStarted', started => console.log(started));
        database.findOne({ username: username }).then(x => {
            if (x) {
                console.log("Rolive : Failed to create account.. Username Invalid");
                res.send("failed");
            } else {
                database.insertOne({ key: md5(robloxsecureid), username: username, password: md5(password), email: email });

                console.log("Rolive : Created Account with ID: NULL");
                res.send("Account Created!");
            }
        });
    }
});

app.get('/login', function (req, res) {
    const username = req.header("Username");
    const password = req.header("Password");

    if (username == null || password == null) {
        console.log("Rolive : Failed to login to an account.. No password or username");
        res.send("failed");
    } else {
        client.on('commandStarted', started => console.log(started));
        database.findOne({ username: username, password: md5(password) }).then(x => {
            if (x) {
                console.log("Rolive : Logged into an account!");
                res.send("logged_in");
            } else {
                console.log("Rolive : Failed to login to an account..");
                res.send("failed");
            }
        });
    }
});

app.listen(port);
console.log('Server started at ' + MainURL);
console.log('Rolive Connection System - Version: ' + Version);
console.log('Connection Made to MongoDB Server, Connection Successful.');