// const Sentence = require('../models/sentence');
// const Label = require('../models/nlpLabels');
// const paginate = require('../utils/pagination')
const { connectToDb, getDb } = require('./db');

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('Serving on Port 3000')
        })
    }

    db = getDb()
})



module.exports.index = async (req, res) => {
    try {
        const name = req.query.name
        // const page = parseInt(req.query.page);
        // const sentences = res.paginatedResults;
        // const totalNum = await Sentence.countDocuments().exec()
        // console.log(totalNum)
        // console.log('############')
        // console.log(sentPag);
        // const sentences = await Sentence.find({})
        const labels = await Label.find({})
        // console.log('############');
        // console.log(req);
        res.render('sentences/sentence', { labels, sentences, page })
    } catch {
        console.log(error)
    }

};


module.exports.duplicateSentence = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const { id } = req.params;
        const sent = await Sentence.findById(id)
        const newSent = new Sentence({
            sentNumber: sent.sentNumber,
            semanticLabel: sent.semanticLabel,
            isExtractable: sent.isExtractable,
            isSelfContanined: sent.isSelfContanined,
            sentWords: sent.sentWords
        })
        // console.log(`/sents?page=${page}`)
        await newSent.save();
        // res.redirect(`/sents?page=${page}`)
        res.redirect(`/sents?page=${page}`)
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
        for (let updWord of data.updatedWordsAndIndx) {
            let updSentIdx = parseInt(updWord[0]);
            sentence.sentWords[updSentIdx][1] = updWord[1]
        }
        // console.log(sentence)
        let updSent = await Sentence.findOneAndUpdate(filter, sentence, {
            new: true
        });
        req.flash('success', 'Successfully updated the sentence.')
        // res.redirect('/sents?page=1')
    } catch {
        console.log(error)
    }

};

module.exports.deleteSingleSentence = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const { id } = req.params;
        const labels = await Sentence.findByIdAndDelete(id)
        // console.log(page);

        res.redirect(`/sents?page=${page}`)
    } catch {
        console.log(error)
    }
}

module.exports.sentenceDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const sentence = await Sentence.findById(id)
        // console.log(sentence)
        // console.log(constructedSentence)
        res.render('sentences/sentenceDetails', { sentence })
    } catch {
        console.log(error)
    }
}


module.exports.updateSentWords = async (req, res) => {
    try {
        const { data, sent_id } = req.body;
        const sentence = await Sentence.findById(sent_id)
        const filter = { _id: sent_id }
        // console.log(sentence)
        sentence.sentWords = data
        // sentence.semanticLabel = sentence.semanticLabel
        // sentence.isExtractable = sentence.isExtractable
        // sentence.isSelfContanined = sentence.isExtractable
        // for (let updWord of data.updatedWordsAndIndx) {
        //     let updSentIdx = parseInt(updWord[0]);
        //     // console.log(updWord)
        //     // console.log(sentence.sentWords[updSentIdx])
        //     sentence.sentWords[updSentIdx][1] = updWord[1]
        // }
        // console.log(data)
        // console.log(sentence)
        let updSent = await Sentence.findOneAndUpdate(filter, sentence, {
            new: true
        });
        console.log('after update')
        req.flash('success', 'Successfully updated the sentence.')
        // res.redirect('sentences/sentenceDetails', { sentence })
    } catch {
        console.log(error)
    }

};




