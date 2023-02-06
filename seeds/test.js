const mongoose = require('mongoose');
// const { corpus } = require('./seedHelpers');
const Sentence = require('../models/sentence');
mongoose.connect('mongodb://localhost:27017/clinicalTrialCorpus_v1');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection.eror:'));
db.once('open', () => {
    console.log('Database is open')
});


s = async () => {
    const sent = await Sentence.find({});
}

sents();

