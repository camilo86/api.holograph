var mongoose = require('mongoose');
var caseRouter = require('./routers/case');
var restify = require('restify');
var server = restify.createServer();

mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/holograph', (error) => {
  if(error) {
    throw error;
  }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res, next) => {
  //res.send('Hello World');
  res.json({
    hello: 'World'
  })
  next();
});

caseRouter.applyRoutes(server, '/cases');


server.listen(process.env.PORT || 3000, () => {
  console.log('Holograph API listening at %s', server.url);
});