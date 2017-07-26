const amqp = require('amqplib');

amqp.connect('amqp://localhost')
.then(conn => conn.createChannel())
.then(ch => {
    
})
.catch(err => {
    console.log(err);
});