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
  req.assert('Source', 'source is not valid').notEmpty().isMongoId();
  req.assert('Target', 'target is not valid').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if(errors) {
    return next(new createError.BadRequest(util.inspect(errors)));
  }

  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var sourceVertex = currentCase.Nodes.id(req.body.Source);
    var targetVertex = currentCase.Nodes.id(req.body.Target);

    if(!sourceVertex || !targetVertex) {
      return next(new createError.NotFound('source/target not found'));
    }

    currentCase.Edges.push({
      Source: SourceVertex._id,
      Target: TargetVertex._id
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

    res.json({
      Edges: currentCase.Edges
    });
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

    var edge = currentCase.Edges.id(req.params.EdgeId);
    if(!edge) {
      return next(new createError.NotFound('Edge not found'));
    }

    res.json(edge);
    next();
  });
};

/**
 * PUT /cases/:caseId/edges/:edgeId
 * Updates an edge source and target
 * - source (optional)
 * - target (optional)
 */
exports.updateEdge = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var tempEdge = null;
    for(var i = 0; i < currentCase.Edges.length; i++) {
      if(currentCase.Edges[i]._id == req.params.edgeId) {
        tempEdge = currentCase.Edges[i];
        var sourceVertex = currentCase.Nodes.id(req.body.Source);
        var targetVertex = currentCase.Nodes.id(req.body.Target);

        if(!sourceVertex || !targetVertex) {
          return next(new createError.NotFound('source/target not found'));
        }

        currentCase.Edges[i].Source = sourceVertex._id || tempEdge.Source;
        currentCase.Edges[i].Sarget = targetVertex._id || tempEdge.Target;

        currentCase.save((error) => {
          if(error) {
            return next(new createError.BadRequest('Could not update case'));
          }

          res.sendStatus(204);
          next();
        });
      }
    }
    if(!tempEdge) {
      return next(new createError.NotFound('Edge not found'));
    }
  });
};

/**
 * DELETE /cases/:caseId/edges/:edgeId
 * Removes an edge
 */
exports.removeEdge = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var tempEdge = null;
    for(var i = 0; i < currentCase.Edges.length; i++) {
      if(currentCase.Edges[i]._id == req.params.edgeId) {
        tempEdge = currentCase.Edges[i];
        
        currentCase.Edges.splice(i, 1);
        currentCase.save((error) => {
          if(error) {
            return next(new createError.BadRequest('Could not remove edge'));
          }

          res.sendStatus(204);
          next();
        });
      }
    }
    if(!tempEdge) {
      return next(new createError.NotFound('Edge not found'));
    }
  });
};