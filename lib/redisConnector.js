var redis = require('redis');
var redisChannels = require('./redisChannels');
var utils = require('./utils');
var get = require('./getters');
var Case = require('./../models/cases');

// Connect to redis
var pub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {auth_pass: process.env.REDIS_PASSWORD, tls: {servername: process.env.REDIS_HOST}});
var sub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {auth_pass: process.env.REDIS_PASSWORD, tls: {servername: process.env.REDIS_HOST}});

pub.on('error', (error) => {
  console.log(error);
  process.exit(1);
});

sub.on('error', (error) => {
  console.log(error);
  process.exit(1);
});

sub.subscribe(redisChannels.graphGenerationStatus);
sub.subscribe(redisChannels.graphGenerationNeeded);

sub.on('message', function(channel, message) {
  if(channel == redisChannels.graphGenerationStatus) {
    var messageJson = JSON.parse(message);
    console.log('- ggs:');
   // console.log(message);

    utils.updateVertices(messageJson.graph, (error) => {
        if(!error) {
          get.caseById(messageJson._id, (error, currentCase) => {
            pub.publish('case_' + messageJson._id, JSON.stringify(currentCase));
            console.log('SENT TO HNC');
          });
        }
    });
  }
});

module.exports = {
  pub: pub,
  sub: sub
};