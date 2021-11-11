const seneca = require('seneca')({
    transport: {
        host: 'localhost',
        port: 6379,
    },
})

seneca
.use('seneca-redis-transport')
.client({
    type: 'redis',
    topic: 'math',
})
.act({
    role: 'calc_age',
    cmd: 'calc_age',
    year: 1987,
},(err,res)=>{
    if(err) console.log(err)

    console.log(res)
})