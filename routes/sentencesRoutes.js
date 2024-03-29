const express = require('express');
const router = express.Router();
const sents = require('../controllers/sentenceController');
const paginate = require('../utils/pagination')
const Sentence = require('../models/sentence');
// const { connect } = require('../db');

router.get('/', paginate(), sents.index);
// router.get('/', sents.index);
router.get('/duplicate/:id', sents.duplicateSentence);
router.post('/updatesentences', sents.updateSingleSentence);
router.route('/:id').get(sents.sentenceDetails).delete(sents.deleteSingleSentence);
router.post('/updatesentwords', sents.updateSentWords);


module.exports = router;