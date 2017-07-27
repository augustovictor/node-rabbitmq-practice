const amqp = require('amqplib');

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    const Q_NAME = 'rpc_queue';
    
    ch.assertQueue('', { exclusive: true })
    .then(q => {
        const corrId = generateUuid();
        const num = 43;

        ch.consume(q.queue, msg => {
            if(msg.properties.correlationId == corrId) {
                console.log(`[.] got ${ msg.content.toString() }`);
            }
        }, { noAck: true });

        ch.sendToQueue(
            Q_NAME,
            new Buffer(num.toString()),
            { correlationId: corrId, replyTo: q.queue }
        );
        console.log(`Requesting fib ${ num }`);
        
    }).catch(err => Promise.reject(err));
    
})
.catch(err => {
    console.log(err);
});