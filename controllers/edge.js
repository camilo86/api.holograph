var createError = require('http-errors');
var util = require('util');
var Case = require('./../models/case');

/**
 * POST /cases/:caseId/edges
 * Creates an edge
 * - source
 * - target
 */
exports.createEdge = (req, res, next) => {
  req.assert('source', 'source is not valid').notEmpty().isMongoId();
  req.assert('target', 'target is not valid').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if(errors) {
    return next(new createError.BadRequest(util.inspect(errors)));
  }

  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var sourceVertex = currentCase.graph.vertices.id(req.body.source);
    var targetVertex = currentCase.graph.vertices.id(req.body.target);

    if(!sourceVertex || !targetVertex) {
      return next(new createError.NotFound('source/target not found'));
    }

    currentCase.graph.edges.push({
      source: sourceVertex._id,
      target: targetVertex._id
    });

    currentCase.save((error) => {
      if(error) {
        return next(new createError.BadRequest('Could not update case'));
      }

      res.json(currentCase.public());
      next();
    });
  });
};

/**
 * GET /cases/:caseId/edges
 * Gets all the edges in case given a caseId
 */
exports.getAllEdges = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    res.json(currentCase.graph.edges);
    next();
  });
};

/**
 * GET /cases/:caseId/edges/:edgeId
 * Gets a single edge given it's caseId and edgeId
 */
exports.getEdge = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var edge = currentCase.graph.edges.id(req.params.edgeId);
    if(!edge) {
      return next(new createError.NotFound('Edge not found'));
    }

    res.json(edge);
    next();
  });
};