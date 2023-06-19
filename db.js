const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/clinicalTrialCorpus_v1'


const client = new MongoClient(url, { useNewUrlParser: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

// async function getDb() {
//     db = connect()
//     return db;
// }

module.exports = { connect };



