const { connect } = require('../db');

module.exports = function paginatedResults() {
    return async (req, res, next) => {
        const searhItem = req.query.s;
        const page = parseInt(req.query.page)
        // const collName = 'sentences'
        const collName = req.query.name
        // const limit = parseInt(req.query.limit)
        const limit = 10;
        const startIndex = (page - 1) * limit
        const endIndex = (page + 3) * limit
        const results = {}
        const db = await connect();
        let lastPage = 0
        const collectionLength = await db.collection(collName).countDocuments()


        if (collectionLength % limit > 0) {
            lastPage = Math.floor(collectionLength / limit) + 1
        } else {
            lastPage = collectionLength / limit
        }

        results.lastPage = lastPage;
        // console.log(db.collection(collName))


        if (endIndex < collectionLength) {
            results.next = {
                page: page + 3,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = {}
            if (searhItem) {
                let searhTerm = searhItem.toUpperCase()
                results.results = await db.collection(collName).find({ sentWords: { $elemMatch: { $elemMatch: { $in: [searhTerm] } } } }).sort({ 'sentNumber': 1 }).limit(limit).skip(startIndex).toArray()
            } else {
                results.results = await db.collection(collName).find().sort({ 'sentNumber': 1 }).limit(limit).skip(startIndex).toArray()
            }
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}