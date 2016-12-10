'use strict';

var socketio = require('socket.io');
var io = null;
var socketStore = {};
var chalk = require('chalk');

module.exports.createSocket = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
        socketStore.main = socket;

        socket.on('test', function(data){
            console.log(chalk.yellow("Socket event recieved. Emitting `test`. . . ", data))
            socket.emit('test', data);
        });

        socket.on('notification', function(data){
            socket.emit('notification');
        })

    });

    return io;

};

// use this methods in called routes (or webhooks)
module.exports.getSocket = function () {
    return socketStore;
};