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
    type: req.body.type
  });

  vertex.save((error) => {
    if(error) {
      return next({
        message: 'Could not create vertex'
      });
    }

    req.case.graph.verticies.push(vertex.id);
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