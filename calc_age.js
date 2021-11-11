const seneca = require('seneca')({
    transport: {
        host: "localhost",
        port: "6379",
    },

});

seneca
.use('seneca-redis-transport')
.add({
    role: 'calc_age',
    cmd: 'calc_age',
    
},(msg, done) => {
    const oldYear = msg.year;
    const currentYear = new Date().getFullYear();
    const age = currentYear - oldYear;

    // send for notify and stop here
    this.client({
        type: 'redis',
        topic: 'notify'
    })
    .act({
        role: 'notify',
        cmd: 'notify',
        text: `You are ${age} years old`
    });
        
    // not send response for client
   done(null, {age: age});
})
.listen({
    type: 'redis',
    topic: 'math'
});