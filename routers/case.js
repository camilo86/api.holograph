var caseController = require('./../controllers/case');
var nodeController = require('./../controllers/node');
var edgeController = require('./../controllers/edge');
var router = require('express').Router();

// POST requests
router.post('/', caseController.createCase);
router.post('/:caseId/nodes', nodeController.createNode);
router.post('/:caseId/edges', edgeController.createEdge);

// PUT requests
router.put('/:caseId', caseController.updateCase);
router.put('/:caseId/nodes/:nodeId', nodeController.updateNode);
router.put('/:caseId/edges/:edgeId', edgeController.updateEdge);

// GET requests
router.get('/', caseController.getAllCases);
router.get('/:caseId', caseController.getCase);
router.get('/:caseId/nodes', nodeController.getAllNodes);
router.get('/:caseId/nodes/:nodeId', nodeController.getNode);
router.get('/:caseId/edges', edgeController.getAllEdges);
router.get('/:caseId/edges/:edgeId', edgeController.getEdge);

// DELETE requests
router.delete('/:caseId', caseController.removeCase);
router.delete('/:caseId/nodes/:nodeId', nodeController.removeNode);
router.delete('/:caseId/edges/:edgeId', edgeController.removeEdge);

module.exports = router;