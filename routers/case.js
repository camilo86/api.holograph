var caseController = require('./../controllers/case');
var router = require('express').Router();

// POST requests
router.post('/', caseController.createCase);

// PUT requests
router.put('/:caseId', caseController.updateCase);

// GET requests
router.get('/', caseController.getAllCases);
router.get('/:caseId', caseController.getCase);

// DELETE requests
router.delete('/:caseId', caseController.removeCase);

module.exports = router;