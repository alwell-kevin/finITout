var express = require('express');
var app = express();
var chalk = require('chalk');


var server = require('http').createServer();

var createApplication = function () {
    var app = require('./server');
    server.on('request', app); // Attach the Express application.
    require('./io').createSocket(server);

};


var startServer = function () {

    var PORT = process.env.PORT || 3001;

    server.listen(PORT, function () {
        console.log(chalk.blue('server is listening on port ', chalk.magenta(PORT)));
    });

};

createApplication();
startServer();