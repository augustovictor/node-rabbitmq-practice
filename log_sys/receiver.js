const amqp = require('amqplib');

amqp.connect('amqp://localhost')
.then(conn => {
    return conn.createChannel();
}).then(ch => {
    ch.assertExchange('logs', 'fanout', { durable: false });

    ch.assertQueue('', { exclusive: true })
    .then(q => {
        console.log(`Queue ${ q.queue } waiting for a message...`);
        ch.bindQueue(q.queue, 'logs', '');

        ch.consume(q.queue, msg => {
            console.log(`Log received [${ new Date().getTime() }]: ${msg.content.toString()}`)
        });
    }).catch(err => Promise.reject(err));
}).catch(err => {
    console.error(err);
});