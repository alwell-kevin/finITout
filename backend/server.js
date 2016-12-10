var express = require('express');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var io = require('./io');

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(function (req, res, next) {

    // server logging //
    console.log("--- NEW REQUEST ---");
    console.log(chalk.bold(chalk.yellow(req.method)) + chalk.magenta(" " + req.path));
    console.log(chalk.bold(chalk.gray("BODY: ")) + (JSON.stringify(req.body)));

    next();
});


server.use('/api', require('./api'));

server.post('/notification', function (req, res) {
   var socket = io.getSocket().main;
   socket.emit('notification');
   req.status(200).send();
});

server.get('/', function (req, res) {
    res.status(200).send('hello from the server!;');
});

module.exports = server;