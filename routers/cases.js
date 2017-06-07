var router = require('express').Router();
var casesController = require('./../controllers/cases');

// POST Requests
router.post('/', casesController.createCase);

module.exports = router;