const express = require('express');
const router = express.Router();
const sents = require('../controllers/sents');

router.get('/', sents.index);



module.exports = router;