var redis = require('redis');
var redisChannels = require('./redisChannels');
var utils = require('./utils');

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
    console.log('- ggs:');
    console.log(message);
    utils.updateVertices(JSON.parse(message));
    console.log(' Done Updating');
  }
});

module.exports = {
  pub: pub,
  sub: sub
};