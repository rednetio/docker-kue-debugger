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
  console.log( 'Queue: Job %s of %s got queud', id, type );

  jobs.process(type, function(job, done){
      console.log( 'Job: Job %s of %s is executed', job.id, job.type );
      jobHasard(job.data, done);
  });
});

function jobHasard(data, callback){ 

    function hasardBoolean(){
        return Math.random()<.5; // Readable, succint
    }

    var tempsAttente = Math.random() * 10000;
    console.log("Job hasard ! hou hou ! La roue tourne... ("+tempsAttente+"ms)");
    setTimeout(function(callback){

      if ( hasardBoolean() ) {
        console.log("Booh! looser!");
        return callback(new Error());
      } else {
        console.log("Yeah you won !");
        return callback(null, "OK");
      };

    }, 2000, callback);
};

kue.app.listen(3000);

process.once( 'SIGTERM', function ( sig ) {
  queue.shutdown(function(err) {
    console.log( 'Kue is shut down.', err||'' );
    process.exit( 0 );
  }, 5000 );
});
