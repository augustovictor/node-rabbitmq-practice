// http://localhost:15672
const amqp = require('amqplib');
const q = require('./queues.json');

amqp.connect('amqp://localhost')
.then(connection => {
    console.log('Connected');
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 1000);
    return connection.createChannel();
})
.then(ch => {
    console.log('Channel created!'); // Presented in Socket Descriptor column in localhost:15672

    // Declaration of a new queue; Only happens if there is no queue with same name
    ch.assertQueue(q.Q_IN_REQ, { durable: false });

    ch.sendToQueue(q.Q_IN_REQ, new Buffer('New request...'));
    console.log('New request sent to the queue');
})
.catch(err => {
    console.error(err);
});