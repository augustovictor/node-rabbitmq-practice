// Consumer
// Worker
const amqp = require('amqplib');
const q = require('./queues.json');

amqp.connect('amqp://localhost')
.then(connection => {
    console.log('Connected from consumer.');
    return connection.createChannel();
})
.then(ch => {
    console.log('Channel created from consumer!'); // Presented in Socket Descriptor column in localhost:15672

    // Also creating the queue here because the consumer might start before the publisher so we want to make
    // sure it already exists.
    ch.assertQueue(q.Q_IN_REQ, { durable: true });
    // Get one message at a time
    ch.prefetch(1);

    ch.consume(q.Q_IN_REQ, msg => {
        const secs = msg.content.toString().split('.').length -1;
        console.log(`Received message [${ new Date().getTime() }]: ${ msg.content.toString() }`)
        setTimeout(() => {
            console.log('Request processed!');
            ch.ack(msg);
        }, secs * 1000);
    }, { noAck: false });
})
.catch(err => {
    console.error(err);
});