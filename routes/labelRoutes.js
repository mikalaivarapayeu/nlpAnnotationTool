const express = require('express');
const router = express.Router();
const labels = require('../controllers/labelController');


router.route('/:id').get(labels.index)
router.route('/:id/syntactic').post(labels.newSyntacticTag).delete(labels.deleteSyntacticTag)
router.route('/:id/semantic').post(labels.newSemanticTag).delete(labels.deleteSemanticTag)




module.exports = router;

