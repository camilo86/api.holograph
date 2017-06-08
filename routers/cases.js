var router = require('express').Router();
var get = require('./../lib/getters');
var casesController = require('./../controllers/cases');
var verticesController = require('./../controllers/vertices');
var edgesController = require('./../controllers/edges');

// POST Requests
router.post('/', casesController.createCase);
router.post('/:caseId/vertices',
  [get.caseFromParams],
  verticesController.createVertex);
router.post('/:caseId/edges',
  [get.caseFromParams, get.sourceInCaseFromBody, get.targetInCaseFromBody],
  edgesController.createEdge);

// GET Requests
router.get('/', casesController.getCases);
router.get('/:caseId',
  [get.caseFromParams],
  casesController.getCase);
router.get('/:caseId/vertices',
  [get.caseFromParams],
  verticesController.getVertices);
router.get('/:caseId/vertices/:vertexId',
  [get.caseFromParams, get.vertexInCase],
  verticesController.getVertex);
router.get('/:caseId/edges',
  [get.caseFromParams],
  edgesController.getEdges);

// PUT Requests
router.put('/:caseId',
  [get.caseFromParams],
  casesController.updateCase);
router.put('/:caseId/vertices/:vertexId',
  [get.caseFromParams, get.vertexInCase],
  verticesController.updateVertex);

// DELETE Requests
router.delete('/:caseId',
  [get.caseFromParams],
  casesController.deleteCase);

module.exports = router;