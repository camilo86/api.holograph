var errs = require('restify-errors');
var util = require('util');
var Case = require('./../models/case');

/**
 * POST /cases/
 * Creates a new case from body
 * - name
 * - description
 */
exports.createCase = (req, res, next) => {
  Case.create(req.body, (error, newCase) => {
    if(error) {
      return next(new errs.BadRequestError('Could not create case'));
    }

    res.json(newCase.public());
    next();
  });
};

/**
 * GET /cases/
 * Gets all the cases
 */
exports.getAllCases = (req, res, next) => {
  Case.find({}, '-__v', (error, cases) => {
    if(error) {
      return next(new errs.BadRequestError('Could not get cases'));
    }

    res.json(cases);
    next();
  });
};

/**
 * GET /cases/:caseId
 * Finds a single case given it's caseId
 */
exports.getCase = (req, res, next) => {
  Case.findById(req.params.caseId, (error, currentCase) => {
    if(error || !currentCase) {
      return next(new errs.NotFoundError('Case not found'));
    }

    res.json(currentCase.public());
    next();
  });
};

/**
 * DELETE /cases/:caseId
 * Removes a single case given it's caseId
 */
exports.removeCase = (req, res, next) => {
  Case.findByIdAndRemove(req.params.caseId, (error) => {
    if(error) {
      return next(new errs.BadRequestError('Could not remove case id'));
    }

    res.send(204);
    next();
  });
};