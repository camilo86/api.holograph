var restify = require('restify');
var errs = require('restify-errors');
var server = restify.createServer();

server.get('/', (req, res, next) => {
  res.send('Hello World');
  next();
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Holograph API listening at %s', server.url);
});