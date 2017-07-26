const amqp = require('amqplib');

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    // Structure <client>.<domain>.<severity>
    // # (hash) can substitute for zero or more words.
    // * (star) can substitute for exactly one word.
    const X_NAME = 'x-topic-logs';
    
    ch.assertExchange(X_NAME, 'topic', { durable: false });

    /*
    * INFO
    */

    // bindingKey = #.info
    // >> 1, 3, 4, 5, 6
    ch.assertQueue('', { exclusive: true }).then(q => {
        ch.bindQueue(q.queue, X_NAME, '#.info');
        ch.consume(q.queue, msg => console.log(`[ #.info ] ${ msg.fields.routingKey }: ${ msg.content.toString() }`));
    });

    // bindingKey = *.info
    // >> 3, 4
    ch.assertQueue('', { exclusive: true }).then(q => {
        ch.bindQueue(q.queue, X_NAME, '*.info');
        ch.consume(q.queue, msg => console.log(`[ *.info ] ${ msg.fields.routingKey }: ${ msg.content.toString() }`));
    });

    // bindingKey = #.sales.#
    // >> 4, 5, 6
    ch.assertQueue('', { exclusive: true }).then(q => {
        ch.bindQueue(q.queue, X_NAME, '#.sales.#');
        ch.consume(q.queue, msg => console.log(`[ #.sales.# ] ${ msg.fields.routingKey }: ${ msg.content.toString() }`));
    });
})
.catch(err => {
    console.log(err);
});