// const Sentence = require('../models/sentence');
// const Label = require('../models/nlpLabels');
// const paginate = require('../utils/pagination')
const { connect } = require('../db');
const { ObjectId } = require('mongodb');



async function createObjectIdFilter(id) {
    const objId = new ObjectId(id)
    const filterObj = { _id: objId };
    return filterObj
}




module.exports.index = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const db = await connect();
        const labels = await db.collection('labels').find().toArray();
        const sentences = res.paginatedResults;
        res.render('sentences/sentence', { labels, sentences, page })
    } catch {
        console.log(error)
    }

};





module.exports.duplicateSentence = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const { id } = req.params;
        const db = await connect();
        const filter = await createObjectIdFilter(id);
        doc = await db.collection('sentences',).findOne(filter);
        delete doc['_id']
        // console.log(doc)
        db.collection('sentences',).insertOne(doc)
        res.redirect(`/sents?page=${page}`)
    } catch {
        console.log(error)
    }

}




module.exports.updateSingleSentence = async (req, res) => {
    try {
        const { data } = req.body;
        const page = parseInt(req.query.page)
        const db = await connect();
        const filter = await createObjectIdFilter(data.sentNumber);
        const sentence = await db.collection('sentences',).findOne(filter);
        const sentWordsUpdate = sentence.sentWords
        for (let i = 0; i < data.updatedWordsAndIndx.length; i++) {
            sentWordsUpdate[i][1] = data.updatedWordsAndIndx[i][1]
        }
        const update = {
            $set: {
                semanticLabel: data.semanticLabel, isExtractable: data.isExtractable, isSelfContanined: data.isSelfContanined,
                sentWords: sentWordsUpdate
            }
        }
        console.log(update)
        await db.collection('sentences').updateOne(filter, update);
        // req.flash('success', 'Successfully updated the sentence.')
        res.redirect(`/sents?page=${page}`)
    } catch {
        console.log(error)
    }

};




module.exports.deleteSingleSentence = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const { id } = req.params;
        const db = await connect();
        const filter = await createObjectIdFilter(id);
        db.collection('sentences').deleteOne(filter)
        res.redirect(`/sents?page=${page}`)
    } catch {
        console.log(error)
    }
}

module.exports.sentenceDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const page = parseInt(req.query.page);
        const db = await connect();
        const filter = await createObjectIdFilter(id);
        console.log(req.query)
        const sentence = await db.collection('sentences',).findOne(filter);
        res.render('sentences/sentenceDetails', { sentence, page })
    } catch {
        console.log(error)
    }
}


module.exports.updateSentWords = async (req, res) => {
    try {
        const { data, sent_id } = req.body;
        const db = await connect();
        const filter = await createObjectIdFilter(sent_id);
        const update = {
            $set: {
                sentWords: data
            }
        }
        await db.collection('sentences').updateOne(filter, update);
        const sentence = await db.collection('sentences').findOne(filter);
        console.log(sentence)
        res.redirect('sentences/sentenceDetails', { sentence })
    } catch {
        console.log(error)
    }

};


// module.exports.updateSentWords = async (req, res) => {
//     try {
//         const { data, sent_id } = req.body;
//         const sentence = await Sentence.findById(sent_id)
//         const filter = { _id: sent_id }
//         // console.log(sentence)
//         sentence.sentWords = data
//         // sentence.semanticLabel = sentence.semanticLabel
//         // sentence.isExtractable = sentence.isExtractable
//         // sentence.isSelfContanined = sentence.isExtractable
//         // for (let updWord of data.updatedWordsAndIndx) {
//         //     let updSentIdx = parseInt(updWord[0]);
//         //     // console.log(updWord)
//         //     // console.log(sentence.sentWords[updSentIdx])
//         //     sentence.sentWords[updSentIdx][1] = updWord[1]
//         // }
//         // console.log(data)
//         // console.log(sentence)
//         let updSent = await Sentence.findOneAndUpdate(filter, sentence, {
//             new: true
//         });
//         console.log('after update')
//         req.flash('success', 'Successfully updated the sentence.')
//         // res.redirect('sentences/sentenceDetails', { sentence })
//     } catch {
//         console.log(error)
//     }

// };



