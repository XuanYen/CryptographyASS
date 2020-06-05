// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
var io = require('socket.io')(http);
var uploadRoute=require("./routes/upload.route");
var decryptRoute=require("./routes/decrypt.route");
var viewRoute=require("./routes/view.route");
app.set('view engine', 'pug');
app.set('views','./views'); 
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(express.static(__dirname));

app.use('/upload', uploadRoute);
app.use('/decrypt', decryptRoute);
app.use('/view', viewRoute);
// listen for requests :)
http.listen(3000,()=>console.log('server listening on port'+3000));

