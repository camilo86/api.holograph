var createError = require('http-errors');
var util = require('util');
var Case = require('./../models/case');

/**
 * POST /Cases/:CaseId/Nodes
 * Adds a new vertex to case's graph
 * - Name
 */
exports.createNode = (req, res, next) => {
  req.assert('Name', 'Name is not valid').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    return next(new createError.BadRequest(util.inspect(errors)));
  }

  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    currentCase.Nodes.push({
      Name: req.body.Name
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
 * GET /Cases/:CaseId/Nodes
 * Gets all Nodes from a case given CaseId
 */
exports.getAllNodes = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    res.json({
      Nodes: currentCase.Nodes
    });
    next();
  });
};

/**
 * GET /Cases/:CaseId/Nodes/:NodeId
 * Gets a single node from a case given CaseId and NodeId
 */
exports.getNode = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var tempVertex = null;
    for(var i = 0; i < currentCase.Nodes.length; i++) {
      if(currentCase.Nodes[i]._id == req.params.nodeId) {
        tempVertex = currentCase.Nodes[i];
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
 * PUT /Cases/:CaseId/Nodes/:NodeId
 * Updates a node given it's CaseId and NodeId
 * - Name (optional)
 */
exports.updateNode = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var tempVertex = null;
    for(var i = 0; i < currentCase.Nodes.length; i++) {
      if(currentCase.Nodes[i]._id == req.params.nodeId) {
        tempVertex = currentCase.Nodes[i];
        currentCase.Nodes[i].Name = req.body.Name || tempVertex.Name;
        currentCase.save((error) => {
          if(error) {
            return next(new createError.BadRequest('Could not update vertex'));
          }

          res.sendStatus(204);
          next();
        });
      }
    }
    if(!tempVertex) {
      return next(new createError.NotFound('Vertex not found'));
    }
  });
};

/**
 * DELETE /Cases/:CaseId/Nodes/:NodeId
 * Removes a single node
 */
exports.removeNode = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new createError.NotFound('Case not found'));
    }

    var tempVertex = null;
    for(var i = 0; i < currentCase.Nodes.length; i++) {
      tempVertex = currentCase.Nodes[i];
      if(tempVertex._id == req.params.nodeId) {
        var edgesIndexToDelete = [];
        for(var x = 0; x < currentCase.Edges.length; x++) {
          if(String(currentCase.Edges[x].source) == String(currentCase.Nodes[i]._id) || String(currentCase.Edges[x].Target) == String(currentCase.Nodes[i]._id)) {
            edgesIndexToDelete.push(x);
          }
        }

        // Removes edges that reference the vertex that is about to be deleted
        for(var c = 0; c < edgesIndexToDelete.length; c++) {
          currentCase.Edges.splice(edgesIndexToDelete[c], 1);
        }

        currentCase.Nodes.splice(i, 1);
        currentCase.save((error) => {
          if(error) {
            return next(new createError.BadRequest('Could not remove vertex'));
          }

          res.sendStatus(204);
          next();
        })
      }
    }
    if(!tempVertex) {
      return next(new createError.NotFound('Vertex not found'));
    }
  });
};