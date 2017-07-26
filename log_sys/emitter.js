const amqp = require('amqplib');
const q = require('../queues');

amqp.connect('amqp://localhost')
.then(conn => {
    return conn.createChannel();
}).then(ch => {
    ch.assertExchange('logs', 'fanout', { durable: false });

    ch.assertQueue('', { exclusive: true }); // Random name and deleted when the connection closes

    ch.publish('logs', '', new Buffer('Logging operation...')); // second param = routingKey; empty = no specific queue;
    console.log('Log sent...');

}).catch(err => {
    console.log(err);
})