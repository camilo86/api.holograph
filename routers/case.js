var caseController = require('./../controllers/case');
var Router = require('restify-router').Router;
var routerInstance = new Router();

routerInstance.post('/', caseController.createCase);

module.exports = routerInstance;