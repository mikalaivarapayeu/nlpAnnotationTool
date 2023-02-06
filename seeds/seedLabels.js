const mongoose = require('mongoose');
const { labelSet } = require('./seedHelpers');
const Label = require('../models/nlpLabels');
mongoose.connect('mongodb://localhost:27017/clinicalTrialCorpus_v1');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection.eror:'));
db.once('open', () => {
    console.log('Database is open')
});


const seedCorpusDB = async () => {
    await Label.deleteMany({});
    const labelSetInstance = new Label({
        labelName: labelSet.labeSetName,
        semanticLabels: labelSet.semanticLabels,
        phraseLabels: labelSet.phraseLabels

    });
    await labelSetInstance.save();
}


seedCorpusDB().then(() => {
    mongoose.connection.close();
});