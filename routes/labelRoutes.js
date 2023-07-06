const express = require('express');
const router = express.Router();
const labels = require('../controllers/labelController');


router.route('/labelset').get(labels.indexTagSet).post(labels.createTagSet)
router.route('/:id').get(labels.index).post(labels.newTag).delete(labels.deleteTag)



module.exports = router;

