var env = require('dotenv').config();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var express = require('express');

// Connect to db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_PROD);
mongoose.connection.on('error', () => {
  console.log('Could not connect to database');
  process.exit(1);
})

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

// Routers
var casesRouter = require('./routers/cases');

app.use('/v1/cases', casesRouter);

// Error handler
app.use((err, req, res, next) => {
  var response = {
    message: err.message,
    status: err.status || 400
  };

  return res.status(response.status).json(response);
});

var listener = app.listen(process.env.PORT || 80, () => {
  console.log('Holograph API running in port ' + listener.address().port);
});

module.exports = app;