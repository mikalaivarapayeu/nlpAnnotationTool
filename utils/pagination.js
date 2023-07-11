const { connect } = require('../db');

module.exports = function paginatedResults() {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        // const collName = 'sentences'
        const collName = req.query.name
        // const limit = parseInt(req.query.limit)
        const limit = 10;
        const startIndex = (page - 1) * limit
        const endIndex = (page + 3) * limit
        const results = {}
        const db = await connect();
        // console.log(db.collection(collName))

        if (endIndex < await db.collection(collName).countDocuments()) {
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
            results.results = await db.collection(collName).find().sort({ 'sentNumber': 1 }).limit(limit).skip(startIndex).toArray()
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}