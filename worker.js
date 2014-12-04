"use strict";

var nconf       = require("nconf").env();
var kue         = require('kue');

// Create Kue connection
var jobs = kue.createQueue({
  prefix: nconf.get("KUE_PREFIX"),
  redis: {
    port: nconf.get("REDIS_PORT_6379_TCP_PORT"),
    host: nconf.get("REDIS_PORT_6379_TCP_ADDR"),
    db: nconf.get("REDIS_DATABASE")
  }
});

console.log("Connected to Kue. Waiting for job...");

jobs.on('job enqueue', function(id,type){
  console.log( 'Queue: Job %s of %s got queued', id, type );

  jobs.process(type, function(job, done){
      console.log( 'Job: Job %s of %s got queued', id, type );
  });

});

kue.app.listen(3000);

process.once( 'SIGTERM', function ( sig ) {
  queue.shutdown(function(err) {
    console.log( 'Kue is shut down.', err||'' );
    process.exit( 0 );
  }, 5000 );
});
