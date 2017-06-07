var router = require('express').Router();
var get = require('./../lib/getters');
var casesController = require('./../controllers/cases');

// POST Requests
router.post('/', casesController.createCase);

// GET Requests
router.get('/', casesController.getCases);
router.get('/:caseId',
  [get.getCaseFromParams],
  casesController.getCase);

// PUT Requests
router.put('/:caseId',
  [get.getCaseFromParams],
  casesController.updateCase);

module.exports = router;