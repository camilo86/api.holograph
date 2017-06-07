var Case = require('./../models/cases');

exports.getCaseFromParams  = (req, res, next) => {
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