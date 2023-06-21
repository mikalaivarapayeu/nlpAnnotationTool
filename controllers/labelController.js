const { connect, createObjectIdFilter } = require('../db');



module.exports.index = async (req, res) => {
    try {
        const db = await connect();
        const labels = await db.collection('labels').find().toArray();
        res.render('labels/label', { labels })
    } catch {
        console.log(error)
    }
}


module.exports.newTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tagName = req.query.tagname
        const { label } = req.body;
        if (label.name !== '') {
            const update = { $push: { [tagName]: { name: label.name } } };
            console.log(update)
            // const options = { upsert: true };
            const db = await connect();
            const filter = await createObjectIdFilter(id);
            await db.collection('labels').findOneAndUpdate(filter, update);
            req.flash('success', 'Successfully add a new tag.')
        }
        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }
}





module.exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tagName = req.query.tagname
        const { label } = req.body;
        if (label.name !== '') {
            const update = { $pull: { [tagName]: { name: label.name } } };
            // const options = { upsert: true };
            const db = await connect();
            const filter = await createObjectIdFilter(id);
            await db.collection('labels').findOneAndUpdate(filter, update);
            req.flash('success', 'The tag has been successfully deleted.')
        }
        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }
}