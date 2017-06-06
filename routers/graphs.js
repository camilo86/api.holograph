var router = require('express').Router();

// GET Requests
router.get('/', (req, res, next) => {
  return res.json({
    hello: 'World'
  });
});

module.exports = router;