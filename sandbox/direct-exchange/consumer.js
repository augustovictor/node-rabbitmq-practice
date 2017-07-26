const amqp = require('amqplib');

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    const X_ERRORS = 'log_messages';
    const lvls = {
        info: ['info', 'info message...'],
        warning: ['warning', 'warning message...'],
        error: ['error', 'error message...']
    };
    const now = new Date().getTime();

    ch.assertExchange(X_ERRORS, 'direct', { durable: true });

    ch.assertQueue('', { exclusive: true })
    .then(q => {
        ch.bindQueue(q.queue, X_ERRORS, lvls.info[0]);
        ch.bindQueue(q.queue, X_ERRORS, lvls.warning[0]);
        ch.consume(q.queue, msg => {
            console.log(`${ now }: ${ msg.fields.routingKey }: ${ msg.content.toString() }`);
        })
    });

    ch.assertQueue('', { exclusive: true })
    .then(q => {
        ch.bindQueue(q.queue, X_ERRORS, lvls.error[0]);
        ch.consume(q.queue, msg => {
            console.log(`FATAL: ${ now }: ${ msg.fields.routingKey }: ${ msg.content.toString() }`);
        });
    });
})
.catch(err => {
    console.log(err);
});