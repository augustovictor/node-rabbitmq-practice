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

   ch.assertExchange(X_ERRORS, 'direct', { durable: true });

   ch.publish(X_ERRORS, lvls.info[0], new Buffer(lvls.info[1]));
   console.log(`Message sent ${ lvls.info[0] }: ${ lvls.info[1] }`);

   ch.publish(X_ERRORS, lvls.warning[0], new Buffer(lvls.warning[1]));
   console.log(`Message sent ${ lvls.warning[0] }: ${ lvls.warning[1] }`);

   ch.publish(X_ERRORS, lvls.error[0], new Buffer(lvls.error[1]));
   console.log(`Message sent ${ lvls.error[0] }: ${ lvls.error[1] }`);

})
.catch(err => {
    console.log(err);
});