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

/**
 * Get a single case
 */
exports.getCase = (req, res, next) => {
  return res.json({
    _id: req.case.id,
    name: req.case.name,
    description: req.case.description
  });
};

/**
 * Updates a case
 */
exports.updateCase = (req, res, next) => {
  req.assert('name', 'name cannot be empty and must be 150 characters or less').optional().notEmpty().isLength({ max: 150 });
  req.assert('description', 'description must be 200 characters or less').optional().isLength({ max: 200 });

  var errors = req.validationErrors();
  if(errors) {
    return next({
      message: errors
    });
  }

  req.case.name = req.body.name || req.case.name;
  req.case.description = req.body.description || req.case.description;

  req.case.save((error) => {
    if(error) {
      return next({
        message: 'Case could not be updated'
      });
    }
    return res.sendStatus(204);
  });
};