const Label = require('../models/nlpLabels');
const Sentence = require('./models/sentence');

module.exports.index = async (req, res) => {
    // try {
    //     const labels = await Label.find({});
    //     console.log('hello');
    // } catch {
    //     console.log(error)
    // }

    res.render('sentences/sentence')
};