const amqp = require('amqplib');

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    const Q_NAME = 'queue_image_processing';
    ch.assertQueue(Q_NAME, { durable: true });
    ch.sendToQueue(Q_NAME, new Buffer('Heavy image...'), { persistent: true });
    console.log('Image sent to workers...');
})
.catch(err => {
    console.log(err);
});