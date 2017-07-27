const amqp = require('amqplib');

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    console.log('Server is waiting for messages....');
    const Q_NAME = 'rpc_queue';

    ch.assertQueue(Q_NAME, { durable: false });

    ch.prefetch(1);

    ch.consume(Q_NAME, msg => {
        console.log('Message received!');
        const n = Number(msg.content.toString());

        console.log(` [.] fib(${ n })`);

        const r = fibonacci(n);

        ch.sendToQueue(
            msg.properties.replyTo,
            new Buffer(r.toString()),
            { correlationId: msg.properties.correlationId  }
        );
        console.log('Response sent back...');

        ch.ack(msg);

    });
})
.catch(err => {
    console.log(err);
});