var mongoose = require('mongoose');
var errs = require('restify-errors');
var restify = require('restify');
var server = restify.createServer();

mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/holograph', (error) => {
  if(error) {
    throw error;
  }
});

server.get('/', (req, res, next) => {
  res.send('Hello World');
  next();
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Holograph API listening at %s', server.url);
});