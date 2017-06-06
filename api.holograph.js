var express = require('express');
var env = require('dotenv').config();
var app = express();

// Routers
var graphsRouter = require('./routers/graphs');

app.use('/v1/graphs', graphsRouter);

var listener = app.listen(process.env.PORT, () => {
  console.log('Holograph API running in port ' + listener.address().port);
});