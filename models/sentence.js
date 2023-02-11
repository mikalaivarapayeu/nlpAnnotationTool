const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const sentenceSchema = new Schema({
    semanticLabel: String,
    isExtractable: Boolean,
    isSelfContanined: Boolean,
    sentWords: [
        [String]
    ],

})

module.exports = mongoose.model('Sentence', sentenceSchema);