const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const labelSchema = new Schema({
    labelSetName: String,
    semanticLabels: [
        {
            name: String
        }
    ],
    phraseLabels: [{
        name: String
    }]
})


module.exports = mongoose.model('Label', labelSchema);