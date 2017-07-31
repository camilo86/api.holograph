var caseController = require('./../controllers/case');
var Router = require('restify-router').Router;
var routerInstance = new Router();

// POST requests
routerInstance.post('/', caseController.createCase);

// PUT requests
routerInstance.put('/:caseId', caseController.updateCase);

// GET requests
routerInstance.get('/', caseController.getAllCases);
routerInstance.get('/:caseId', caseController.getCase);

// DELETE requests
routerInstance.del('/:caseId', caseController.removeCase);

module.exports = routerInstance;