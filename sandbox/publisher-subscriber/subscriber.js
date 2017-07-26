const amqp = require('amqplib');
const utils = require('../../utils');

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    const X_NAME = 'logs';
    ch.assertExchange(X_NAME, 'fanout', { durable: false });
    ch.assertQueue('', { exclusive: true })
    .then(q => {
        ch.bindQueue(q.queue, X_NAME, '');

        ch.consume(q.queue, msg => {
            console.log(`Logging operation at ${ new Date().getTime() } \'${ msg.content.toString() }\'`);
        }, { noAck: true });
    })
    
    
})
.catch(err => {
    console.log(err);
});