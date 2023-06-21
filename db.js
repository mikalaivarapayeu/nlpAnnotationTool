const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');


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


async function createObjectIdFilter(id) {
    const objId = new ObjectId(id)
    const filterObj = { _id: objId };
    return filterObj
}


module.exports = { connect, createObjectIdFilter };



