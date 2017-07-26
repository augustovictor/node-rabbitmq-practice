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

    // 1 - routingKey = info
    ch.publish(X_NAME, 'info', new Buffer('1 - [ info ]: It is a good time to check out log files.'));

    // 2 - routingKey = any.info
    ch.publish(X_NAME, 'info.any', new Buffer('2 - [ info ]: It is a good time to check out log files.'));
    
    // 3 - routingKey = any.info
    ch.publish(X_NAME, 'any.info', new Buffer('3 - [ info ]: This is an info for everyone.'));

    // 4 - routingKey = sales.info
    ch.publish(X_NAME, 'sales.info', new Buffer('4 - [ info ]: There are 10 new employees.'));

    // 5 - routingKey = supermarket.sales.info
    ch.publish(X_NAME, 'supermarket.sales.info', new Buffer('5 - [ info ]: Get ready for the give away today!!!'));

    // 6 - routingKey = general.supermarket.sales.info
    ch.publish(X_NAME, 'general.supermarket.sales.info', new Buffer('6 - [ info ]: The other supermarkets are good to go! Are you?'));

    console.log('Info messages sent...');

})
.catch(err => {
    console.log(err);
});