var Vertex = require('./../models/vertices');

/**
 * Creates a new node
 */
exports.createVertex = (req, res, next) => {
  req.assert('name', 'name cannot be empty').notEmpty();
  req.assert('type', 'type cannot be empty').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    return next({
      message: errors
    });
  }

  var vertex = new Vertex({
    name: req.body.name,
    type: req.body.type,
    case: req.case.id
  });

  vertex.save((error) => {
    if(error) {
      return next({
        message: 'Could not create vertex'
      });
    }

    req.case.graph.vertices.push(vertex.id);
    req.case.save((error) => {
      if(error) {
        return next({
          message: 'Could add new vertex to case'
        });
      }

      return res.status(201).json({
        _id: vertex._id,
        name: vertex.name,
        type: vertex.type
      });
    });
  });
};

/**
 * Gets all vertices in case
 */
exports.getVertices = (req, res, next) => {
  return res.json(req.case.graph.vertices);
}; 

/**
 * Gets a single vertex
 */
exports.getVertex = (req, res, next) => {
  return res.json({
    _id: req.vertex.id,
    name: req.vertex.name,
    type: req.vertex.type,
    coordinates: req.vertex.coordinates
  })
};

exports.updateVertex = (req, res, next) => {
  req.assert('name', 'name cannot be empty').optional().notEmpty();
  req.assert('type', 'type cannot be empty').optional().notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    return next({
      message: errors
    });
  }

  req.vertex.name = req.body.name || req.vertex.name;
  req.vertex.type = req.body.type || req.vertex.type;

  req.vertex.save((error) => {
    if(error) {
      return next({
        message: 'Vertex could not be updated'
      });
    }

    return res.sendStatus(204);
  });
};