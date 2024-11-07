const express = require('express');
const { index } = require('../controllers/blog-controller');
const router = express.Router();

/* localhost:4000/api/v1/blog/ */
router.get('/', index);


module.exports = router;

