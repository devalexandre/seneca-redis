const seneca = require('seneca')({
    transport:{
        host: 'localhost',
        port: 6379 
    }
  });
  seneca
  .use('seneca-redis-transport')
  .add({
      role: 'notify',
      cmd: 'send'
    }, (msg) => {
      console.log('notify: ' + JSON.stringify(msg,undefined,2))
    })
  .listen({
    type: "redis",
    topic: "notify",
  })