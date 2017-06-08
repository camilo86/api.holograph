var Edge = require('./../models/edges');

/**
 * Creates a new edge
 */
exports.createEdge = (req, res, next) => {
  var edge = new Edge({
    source: req.source,
    target: req.target
  });

  edge.save((error) => {
    if(error) {
      return next({
        message: 'Could not create new edge'
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