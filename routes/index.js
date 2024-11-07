var express = require('express');
var router = express.Router();

/* GET home api. */
// localhost:4000/
router.get('/', function(req, res, next) {
  return res.status(200).json({message: 'Sak API v1.0.0'});
});

module.exports = router;
