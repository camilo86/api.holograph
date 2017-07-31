var caseController = require('./../controllers/case');
var vertexController = require('./../controllers/vertex');
var edgeController = require('./../controllers/edge');
var router = require('express').Router();

// POST requests
router.post('/', caseController.createCase);
router.post('/:caseId/vertices', vertexController.createVertex);
router.post('/:caseId/edges', edgeController.createEdge);

// PUT requests
router.put('/:caseId', caseController.updateCase);
router.put('/:caseId/vertices/:vertexId', vertexController.updateVertex);

// GET requests
router.get('/', caseController.getAllCases);
router.get('/:caseId', caseController.getCase);
router.get('/:caseId/vertices', vertexController.getAllVertices);
router.get('/:caseId/vertices/:vertexId', vertexController.getVertex);
router.get('/:caseId/edges', edgeController.getAllEdges);
router.get('/:caseId/edges/:edgeId', edgeController.getEdge);

// DELETE requests
router.delete('/:caseId', caseController.removeCase);
router.delete('/:caseId/vertices/:vertexId', vertexController.removeVertex);

module.exports = router;