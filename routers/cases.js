var router = require('express').Router();
var casesController = require('./../controllers/cases');

// POST Requests
router.post('/', casesController.createCase);

// GET Requests
router.get('/', casesController.getCases);

module.exports = router;