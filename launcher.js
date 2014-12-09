"use strict";

var nconf       = require("nconf").argv().env("_");
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

var jobType = nconf.get("job");
var data = {};
if (nconf.get("idFile")) { data.idFile = nconf.get("idFile") }
if (nconf.get("mimeType")) { data.mimeType = nconf.get("mimeType") }

console.log(jobType, data);
var job = jobs
	.create(jobType, data)
	.save( function(err){ if( !err ) console.log( "Job soumis : "+job.id ); });

job.on('complete', function(result){
  console.log("Result du job: "+result);
  process.exit();
});
job.on('failed', function(){
  console.log("Job failed");
  process.exit();
});
