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