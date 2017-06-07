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
       _id: newCase._id,
      name: newCase.name,
      description: newCase.description
    });
  });
};

/**
 * Get all cases
 */
exports.getCases = (req, res, next) => {
  Case.find({})
    .select('_id name description')
    .exec((error, cases) => {
    if(error) {
      return next({
        message: 'cases not found',
        status: 404
      });
    }

    return res.json(cases);
  });
};