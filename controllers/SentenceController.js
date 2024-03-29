const { connect, createObjectIdFilter } = require('../db');




module.exports.index = async (req, res) => {
    try {
        const searchTerm = req.query.s
        const page = parseInt(req.query.page);
        const collection = req.query.name
        const labelSetName = req.query.lbsname
        const db = await connect();
        const labels = await db.collection('labels_systematicReviews').find({ labelSetName: labelSetName }).toArray();
        const sentences = res.paginatedResults;
        let queryItems;
        if (searchTerm) {
            queryItems = `s=${searchTerm}&name=${collection}&lbsname=${labelSetName}&page=`
        } else {
            queryItems = `name=${collection}&lbsname=${labelSetName}&page=`
        }

        // res.render('sentences/sentence', { labels, sentences, page, collection, labelSetName, queryItems })
        res.render('sentences/sentence', { labels, sentences, page, queryItems })
    } catch {
        console.log(error)
    }

};





module.exports.duplicateSentence = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        collection = req.query.name;
        const labelSetName = req.query.lbsname;
        const { id } = req.params;
        const db = await connect();
        const filter = await createObjectIdFilter(id);
        doc = await db.collection(collection).findOne(filter);
        delete doc['_id']
        db.collection(collection).insertOne(doc);
        res.redirect(`/sents?page=${page}&name=${collection}&lbsname=${labelSetName}`)
    } catch {
        console.log(error)
    }

}




module.exports.updateSingleSentence = async (req, res) => {
    try {
        const { data } = req.body;
        const page = parseInt(req.query.page);
        const collection = req.query.name;
        const labelSetName = req.query.lbsname;
        const db = await connect();
        const filter = await createObjectIdFilter(data.sentNumber);
        const sentence = await db.collection(collection).findOne(filter);
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
        await db.collection(collection).updateOne(filter, update);
        // req.flash('success', 'Successfully updated the sentence.')
        res.redirect(`/sents?page=${page}&name=${collection}&lbsname=${labelSetName}`)
    } catch {
        console.log(error)
    }

};




module.exports.deleteSingleSentence = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const labelSetName = req.query.lbsname;
        const collection = req.query.name
        const { id } = req.params;
        const db = await connect();
        const filter = await createObjectIdFilter(id);
        db.collection(collection).deleteOne(filter)
        res.redirect(`/sents?page=${page}&name=${collection}&lbsname=${labelSetName}`)
    } catch {
        console.log(error)
    }
}

module.exports.sentenceDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const collection = req.query.name;
        const labelSetName = req.query.lbsname;
        const page = parseInt(req.query.page);
        const db = await connect();
        const filter = await createObjectIdFilter(id);
        const sentence = await db.collection(collection).findOne(filter);
        res.render('sentences/sentenceDetails', { sentence, page, collection, labelSetName })
    } catch {
        console.log(error)
    }
}


module.exports.updateSentWords = async (req, res) => {
    try {
        const { data, sent_id } = req.body;
        const collection = req.query.name;
        const db = await connect();
        const filter = await createObjectIdFilter(sent_id);
        const update = {
            $set: {
                sentWords: data
            }
        }
        // console.log(req.query)
        await db.collection(collection).updateOne(filter, update);
        // const sentence = await db.collection(collection).findOne(filter);
        // res.redirect('sentences/sentenceDetails', { sentence })

    } catch {
        console.log(error)
    }

};






