var errs = require('restify-errors');
var Case = require('./../models/case');

exports.createCase = (req, res, next) => {
  res.send('Hello Case Controller');
  next();
};