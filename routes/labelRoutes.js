const express = require('express');
const router = express.Router();
const labels = require('../controllers/labelController');


router.route('/:id').get(labels.index)
router.route('/:id').post(labels.newTag).delete(labels.deleteTag)




module.exports = router;

