const { connect, createObjectIdFilter } = require('../db');



module.exports.index = async (req, res) => {
    try {
        const collection = req.query.name
        const page = parseInt(req.query.page);
        const db = await connect();
        const labels = await db.collection('labels_systematicReviews').find().toArray();
        res.render('labels/label', { labels, page, collection })
    } catch {
        console.log(error)
    }
}


module.exports.newTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tagName = req.query.tagname
        const { label } = req.body;
        const collection = req.query.name
        const page = parseInt(req.query.page);
        if (label.name !== '') {
            const update = { $push: { [tagName]: { name: label.name } } };
            // const options = { upsert: true };
            const db = await connect();
            const filter = await createObjectIdFilter(id);
            await db.collection('labels_systematicReviews').findOneAndUpdate(filter, update);
            req.flash('success', 'Successfully add a new tag.')
        }
        res.redirect(`/labels/{id}?page=${page}&name=${collection}`)
    } catch {
        console.log(error)
    }
}





module.exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tagName = req.query.tagname
        const { label } = req.body;
        const collection = req.query.name
        const page = parseInt(req.query.page);
        if (label.name !== '') {
            const update = { $pull: { [tagName]: { name: label.name } } };
            // const options = { upsert: true };
            const db = await connect();
            const filter = await createObjectIdFilter(id);
            await db.collection('labels_systematicReviews').findOneAndUpdate(filter, update);
            req.flash('success', 'The tag has been successfully deleted.')
        }
        res.redirect(`/labels/{id}?page=${page}&name=${collection}`)
    } catch {
        console.log(error)
    }
}

module.exports.indexTagSet = async (req, res) => {
    const labelSetList = [];
    const filter = { name: { $regex: /^labels_/i } }
    const db = await connect();
    await db.listCollections(filter).forEach(labelSet => {
        labelSetList.push(labelSet["name"])
    })
    // console.log(labelList)
    res.render('labels/labelSet', { labelSetList })
}

module.exports.createTagSet = async (req, res) => {
    const { labelset } = req.body;
    const db = await connect();
    const collectionName = 'labels_' + labelset.name;
    const collectionInsert = {
        labelSetName: collectionName,
        semanticLabels: [{ name: labelset.semanticLabels }],
        phraseLabels: [{ name: labelset.phraseLabels }]
    };
    await db.createCollection(collectionName);
    try {
        await db.collection(collectionName).insertOne(collectionInsert)
    } catch {
        console.log(error)
    };
    // console.log(collectionInsert)
    res.render('labels/labelSet');
}