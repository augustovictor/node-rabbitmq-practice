module.exports.heavyTask = (ch, msg, shouldAck = false) => {
    const msgString = msg.content.toString();
    const taskIntensity = msgString.split('.').length -1;
    const now = new Date().getTime();

    console.log(`Received at ${ now }: ${ msgString }`);

    return setTimeout(() => {
        console.log(`Done processing heavy task after ${taskIntensity}s;`);
        if(shouldAck) ch.ack(msg);
    }, taskIntensity * 1000);
}