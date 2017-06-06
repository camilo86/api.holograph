var env = require('dotenv').config();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

// Routers
var graphsRouter = require('./routers/graphs');

app.use('/v1/graphs', graphsRouter);

var listener = app.listen(process.env.PORT, () => {
  console.log('Holograph API running in port ' + listener.address().port);
});