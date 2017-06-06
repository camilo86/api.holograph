var express = require('express');
var env = require('dotenv').config();
var app = express();

app.get('/', (req, res, next) => {
  return res.json({
    hello: 'world'
  });
});

var listener = app.listen(process.env.PORT, () => {
  console.log('Holograph API running in port ' + listener.address().port);
});