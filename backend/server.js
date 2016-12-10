var express = require('express');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var io = require('./io');

var FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:8100";

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(function (req, res, next) {

    // server logging //
    console.log("--- NEW REQUEST ---");
    console.log(chalk.bold(chalk.yellow(req.method)) + chalk.magenta(" " + req.path));
    console.log(chalk.bold(chalk.gray("BODY: ")) + (JSON.stringify(req.body)));

    //res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});


server.use('/api', require('./api'));

server.post('/notification', function (req, res) {
   var socket = io.getSocket().main;
   socket.emit('notification');
   res.status(200).send();
});

server.get('/', function (req, res) {
    res.status(200).send('hello from the server!;');
});

module.exports = server;