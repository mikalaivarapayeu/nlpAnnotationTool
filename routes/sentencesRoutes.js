const express = require('express');
const router = express.Router();
const sents = require('../controllers/sentenceController');
const paginate = require('../utils/pagination')
const Sentence = require('../models/sentence');

router.get('/', paginate(Sentence), sents.index);
router.get('/duplicate/:id', sents.duplicateSentence);
router.post('/updatesentences', sents.updateSingleSentence);




module.exports = router;