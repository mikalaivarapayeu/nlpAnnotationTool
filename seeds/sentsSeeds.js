const mongoose = require('mongoose');
const { corpus } = require('./seedHelpers');
const Sentence = require('../models/sentence');
mongoose.connect('mongodb://localhost:27017/clinicalTrialCorpus_v1');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection.eror:'));
db.once('open', () => {
    console.log('Database is open')
});


const seedCorpusDB = async () => {
    await Sentence.deleteMany({});
    for (let sent of corpus.sentences) {
        const sentToDB = new Sentence({
            sentNumber: sent.sentNumber,
            semanticLabel: sent.labelName,
            isExtractable: sent.isExtractable,
            isSelfContanined: sent.isSelfContanined,
            sentWords: sent.words

        });
        await sentToDB.save();
    }
};

seedCorpusDB().then(() => {
    mongoose.connection.close();
});