const { connect, createObjectIdFilter } = require('../db');


async function colorGenerator() {
    let red = Math.floor(Math.random() * 215)
    let green = Math.floor(Math.random() * 215)
    let blue = Math.floor(Math.random() * 215)
    console.log(`rgb(${red},${green},${blue})`)
    return `rgb(${red},${green},${blue})`
}


module.exports.index = async (req, res) => {
    try {
        const collection = req.query.name;
        const labelSetName = req.query.lbsname;
        const page = parseInt(req.query.page);
        const db = await connect();
        const labels = await db.collection('labels_systematicReviews').find({ labelSetName: labelSetName }).toArray();
        let queryItems = `name=${collection}&lbsname=${labelSetName}&page=`
        res.render('labels/label', { labels, page, queryItems })
    } catch {
        console.log(error)
    }
}


module.exports.newTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tagName = req.query.tagname
        const labelSetName = req.query.lbsname;
        const { label } = req.body;
        const collection = req.query.name
        const page = parseInt(req.query.page);
        if (label.name !== '') {
            let update = { $push: { [tagName]: { name: label.name } } };
            if (tagName === "phraseLabels") {
                const color = await colorGenerator();
                update = { $push: { [tagName]: { name: label.name, tagColor: color } } };
            }
            console.log(update);
            const db = await connect();
            const filter = await createObjectIdFilter(id);
            await db.collection('labels_systematicReviews').findOneAndUpdate(filter, update);
            req.flash('success', 'Successfully add a new tag.')
        }
        res.redirect(`/labels/{id}?page=${page}&name=${collection}&lbsname=${labelSetName}`)
    } catch {
        console.log(error)
    }
}





module.exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tagName = req.query.tagname;
        const labelSetName = req.query.lbsname;
        const { label } = req.body;
        const collection = req.query.name
        const page = parseInt(req.query.page);
        if (label.name !== '') {
            const update = { $pull: { [tagName]: { name: label.name } } };
            const db = await connect();
            const filter = await createObjectIdFilter(id);
            await db.collection('labels_systematicReviews').findOneAndUpdate(filter, update);
            req.flash('success', 'The tag has been successfully deleted.')
        }
        res.redirect(`/labels/{id}?page=${page}&name=${collection}&lbsname=${labelSetName}`)
    } catch {
        console.log(error)
    }
}

module.exports.indexTagSet = async (req, res) => {
    const labelSetList = [];
    const filter = { name: { $regex: /^labels_/i } }
    const db = await connect();
    await db.collection('labels_systematicReviews').find().forEach(labelSet => {
        labelSetList.push(labelSet)
    })
    console.log(labelSetList)
    res.render('labels/labelSet', { labelSetList })
}

module.exports.createTagSet = async (req, res) => {
    const labelSetList = [];
    const { labelset } = req.body;
    const db = await connect();
    const collectionName = 'labels_' + labelset.name;
    const collectionInsert = {
        labelSetName: collectionName,
        semanticLabels: [{ name: labelset.semanticLabels }],
        phraseLabels: [{ name: labelset.phraseLabels }]
    };
    try {
        await db.collection('labels_systematicReviews').insertOne(collectionInsert)
    } catch {
        console.log(error)
    };
    await db.collection('labels_systematicReviews').find().forEach(labelSet => {
        labelSetList.push(labelSet)
    })
    res.render('labels/labelSet', { labelSetList });
}