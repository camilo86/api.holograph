var createError = require('http-errors');
var util = require('util');
var Case = require('./../models/case');

/**
 * POST /cases/:caseId/vertices
 * Adds a new vertex to case's graph
 * - name
 */
exports.createVertex = (req, res, next) => {
  req.assert('name', 'name is not valid').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    return next(new createError.BadRequest(util.inspect(errors)));
  }

  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    currentCase.graph.vertices.push({
      name: req.body.name
    });

    currentCase.save((error) => {
      if(error) {
        return next(new createError.BadRequest('Could not add new vertex'));
      }

      res.json(currentCase.public());
      next();
    });
  });
};

/**
 * GET /cases/:caseId/vertices
 * Gets all vertices from a case given caseId
 */
exports.getAllVertices = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    res.json(currentCase.graph.vertices);
    next();
  });
};

/**
 * GET /cases/:caseId/vertices/:vertexId
 * Gets a single vertex from a case given caseId and vertexId
 */
exports.getVertex = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var tempVertex = null;
    for(var i = 0; i < currentCase.graph.vertices.length; i++) {
      tempVertex = currentCase.graph.vertices[i];
      if(tempVertex._id == req.params.vertexId) {
        res.json(tempVertex);
        next();
      }
    }
    if(!tempVertex) {
      return next(new createError.NotFound('Vertex not found'));
    }
  });
};

/**
 * PUT /cases/:caseId/vertices/:vertexId
 * Updates a vertex given it's caseId and vertexId
 * - name (optional)
 */
exports.updateVertex = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var tempVertex = null;
    for(var i = 0; i < currentCase.graph.vertices.length; i++) {
      tempVertex = currentCase.graph.vertices[i];
      if(tempVertex._id == req.params.vertexId) {
        currentCase.graph.vertices[i].name = req.body.name || tempVertex.name;
        currentCase.save((error) => {
          if(error) {
            return next(new createError.BadRequest('Could not update vertex'));
          }

          res.send(204);
          next();
        });
      }
    }
    if(!tempVertex) {
      return next(new createError.NotFound('Vertex not found'));
    }
  });
};