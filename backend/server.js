var express = require('express');
var bodyParser = require('body-parser');
var chalk = require('chalk');

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(function (req, res, next) {

    // server logging //
    console.log("--- NEW REQUEST ---");
    console.log(chalk.bold(chalk.yellow(req.method)) + chalk.magenta(" " + req.path));
    console.log(chalk.bold(chalk.gray("BODY: ")) + (JSON.stringify(req.body)));

    /// global custom headers ///
    // res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);

    next();
});

server.get('/', function (req, res) {
    res.status(200).send('hello from the server!;');
});

module.exports = server;