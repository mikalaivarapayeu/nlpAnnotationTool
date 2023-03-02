const Sentence = require('../models/sentence');
const Label = require('../models/nlpLabels');
// const paginate = require('../utils/pagination')



module.exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const sentences = res.paginatedResults;
        // const totalNum = await Sentence.countDocuments().exec()
        // console.log(totalNum)
        // console.log('############')
        // console.log(sentPag);
        // const sentences = await Sentence.find({})
        const labels = await Label.find({})
        // console.log(sentences[0]);
        res.render('sentences/sentence', { labels, sentences, page })
    } catch {
        console.log(error)
    }

};


module.exports.duplicateSentence = async (req, res) => {
    try {
        const { id } = req.params;
        const sent = await Sentence.findById(id)
        const newSent = new Sentence({
            sentNumber: sent.sentNumber,
            semanticLabel: sent.labelName,
            isExtractable: sent.isExtractable,
            isSelfContanined: sent.isSelfContanined,
            sentWords: sent.sentWords
        })
        // console.log(newSent)
        await newSent.save();
        res.redirect('/sents?page=1')
    } catch {
        console.log(error)
    }

}



module.exports.updateSingleSentence = async (req, res) => {
    try {
        const { data } = req.body;
        // console.log(data)
        const sentence = await Sentence.findById(data.sentNumber)
        const filter = { _id: data.sentNumber }
        const update = {}
        sentence.semanticLabel = data.semanticLabel
        sentence.isExtractable = data.isExtractable
        sentence.isSelfContanined = data.isSelfContanined
        // console.log(data)
        // console.log(data.updatedWordsAndIndx)
        for (let updWord of data.updatedWordsAndIndx) {
            let updSentIdx = parseInt(updWord[0]);
            // console.log(updWord)
            // console.log(sentence.sentWords[updSentIdx])
            sentence.sentWords[updSentIdx][1] = updWord[1]
        }
        // console.log(sentence)
        let updSent = await Sentence.findOneAndUpdate(filter, sentence, {
            new: true
        });
        req.flash('success', 'Successfully updated the sentence.')
        res.redirect('/sents?page=1')
    } catch {
        console.log(error)
    }

};

module.exports.deleteSingleSentence = async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Sentence.findByIdAndDelete(id)
        // console.log(labels.semanticLabels);

        res.redirect('/sents?page=1')
    } catch {
        console.log(error)
    }
}

