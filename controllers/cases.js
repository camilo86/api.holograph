var Case = require('./../models/cases');

/**
 * Creates a new case
 */
exports.createCase = (req, res, next) => {
  req.assert('name', 'name cannot be empty and must be 150 characters or less').notEmpty().isLength({ max: 150 });
  req.assert('description', 'description must be 200 characters or less').optional().isLength({ max: 200 });

  var errors = req.validationErrors();
  if(errors) {
    return next({
      message: errors
    });
  }

  var newCase = new Case({
    name: req.body.name,
    description: req.body.description
  });

  newCase.save((error) => {
    if(error) {
      return next({
        message: 'Could not create new case'
      });
    }

    return res.status(201).json({
      name: newCase.name,
      description: newCase.description,
      _id: newCase.id
    });
  });
};