const amqp = require('amqplib');

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    const X_NAME = 'logs';
    ch.assertExchange(X_NAME, 'fanout', { durable: false });
    ch.publish(X_NAME, '', new Buffer('New operation...'));
    console.log('Operation done...');
})
.catch(err => {
    console.log(err);
});