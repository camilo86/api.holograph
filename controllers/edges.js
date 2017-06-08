var Edge = require('./../models/edges');

/**
 * Creates a new edge
 */
exports.createEdge = (req, res, next) => {
  var edge = new Edge({
    source: req.source,
    target: req.target,
    case: req.case
  });

  edge.save((error) => {
    if(error) {
      return next({
        message: error
      });
    }

    req.case.graph.edges.push(edge.id);
    req.case.save((error) => {
      if(error) {
        return next({
          message: 'Could not add new edge to case'
        });
      }

      return res.status(201).json({
        _id: edge.id,
        source: edge.source,
        target: edge.target
      });
    });
  });
};

/**
 * Gets all edges in a case
 */
exports.getEdges = (req, res, next) => {
  return res.json(req.case.graph.edges);
};

/**
 * Gets a single edge
 */
exports.getEdge = (req, res, next) => {
  return res.json({
    _id: req.edge._id,
    source: req.edge.source,
    target: req.edge.target
  });
};

/**
 * Updates an edge
 */
exports.updateEdge = (req, res, next) => {
  req.edge.source = req.source || req.edge.source;
  req.edge.target = req.target || req.edge.target;

  req.edge.save((error) => {
    if(error) {
      return next({
        message: 'Could not update edge'
      });
    }

    return res.sendStatus(204);
  });
};