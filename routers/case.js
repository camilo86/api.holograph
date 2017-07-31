var caseController = require('./../controllers/case');
var vertexController = require('./../controllers/vertex');
var router = require('express').Router();

// POST requests
router.post('/', caseController.createCase);
router.post('/:caseId/vertices', vertexController.createVertex);

// PUT requests
router.put('/:caseId', caseController.updateCase);
router.put('/:caseId/vertices/:vertexId', vertexController.updateVertex);

// GET requests
router.get('/', caseController.getAllCases);
router.get('/:caseId', caseController.getCase);
router.get('/:caseId/vertices', vertexController.getAllVertices);
router.get('/:caseId/vertices/:vertexId', vertexController.getVertex);

// DELETE requests
router.delete('/:caseId', caseController.removeCase);
router.delete('/:caseId/vertices/:vertexId', vertexController.removeVertex);

module.exports = router;