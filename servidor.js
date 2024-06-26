#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function(error1, channel) {
        if(error1){
            throw error1;
        }

        var queue = 'mensagem';
        channel.assertQueue(queue, {
            durable: false
        });

        console.log("Aguardando requisições dos clientes.", queue);

        channel.consume(queue, function(msg) {
            console.log("Recebido %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});