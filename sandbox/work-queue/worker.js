const amqp = require('amqplib');
const utils = require('../../utils');

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    const Q_NAME = 'queue_image_processing';
    ch.assertQueue(Q_NAME, { durable: true });
    ch.prefetch(1);
    ch.consume(Q_NAME, msg => {
        const now = new Date().getTime();
        console.log(`Received at ${ now }: ${ msg.content.toString() }`);
        utils.heavyTask(ch, msg, true);
    });
})
.catch(err => {
    console.log(err);
});