var Case = require('./../models/cases');
var Vertex = require('./../models/vertices');

exports.caseFromParams  = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next({
        message: 'Case not found',
        status: 404
      });
    }

    req.case = currentCase;
    next();
  });
};

exports.verticesFromCase = (req, res, next) => {
  Vertex.find({
    _id: {
      $in: req.case.graph.vertices
    }
  })
  .select('_id name type')
  .exec((error, vertices) => {
    if(error || !vertices) {
      return next({
        message: 'Vertices not found',
        code: 404
      });
    }

    req.vertices = vertices;
    next();
  });
}

exports.vertexInCase = (req, res, next) => {
  Vertex.findById(req.params.vertexId, (error, vertex) => {
    if(error || !vertex) {
      return {
        message: 'Vertex not found',
        status: 404
      }
    }

    if(vertex.case != req.case.id) {
      return next({
        message: 'Vertex not found',
        status: 404
      });
    }

    req.vertex = vertex;
    next();
  });
};

exports.sourceInCaseFromBody = (req, res, next) => {
  req.assert('source', 'source is not a valid mongoId').notEmpty().isMongoId();
  
  var errors = req.validationErrors();
  if(errors) {
    return next({
      message: errors
    });
  }

  Vertex.findById(req.body.source, (error, source) => {
    if(error || !source) {
      return next({
        message: 'Source vertex not found',
        status: 404
      });
    }

    if(source.case != req.case.id) {
      return next({
        message: 'Source vertex not found',
        status: 404
      });
    }

    req.source = source;
    next();
  });
};

exports.targetInCaseFromBody = (req, res, next) => {
  req.assert('target', 'target is not a valid mongoId').notEmpty().isMongoId();
  
  var errors = req.validationErrors();
  if(errors) {
    return next({
      message: errors
    });
  }

  Vertex.findById(req.body.target, (error, target) => {
    if(error || !target) {
      return next({
        message: 'Target vertex not found',
        status: 404
      });
    }

    if(target.case != req.case.id) {
      return next({
        message: 'Target vertex not found',
        status: 404
      });
    }

    req.target = target;
    next();
  });
};