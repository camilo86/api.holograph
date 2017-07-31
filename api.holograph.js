var express = require('express');
var app = express();

app.get('/', (req, res, next) => {
  return res.json({
    message: 'Hello World!'
  });
});

var listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Holograph API running in port ' + listener.address().port);
});

module.exports = app;