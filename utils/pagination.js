const { connect } = require('../db');

module.exports = function paginatedResults() {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        // const limit = parseInt(req.query.limit)
        const limit = 5;
        const startIndex = (page - 1) * limit
        const endIndex = (page + 3) * limit
        const results = {}
        const db = await connect();


        if (endIndex < await db.collection('sentences').countDocuments()) {
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
            results.results = await db.collection('sentences').find().sort({ 'sentNumber': 1 }).limit(limit).skip(startIndex).toArray()
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}