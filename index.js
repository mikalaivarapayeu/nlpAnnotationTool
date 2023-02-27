const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');



const labelRoutes = require('./routes/labelRoutes');
const Label = require('./models/nlpLabels');
const Sentence = require('./models/sentence');
const paginate = require('./utils/pagination')


mongoose.connect('mongodb://localhost:27017/clinicalTrialCorpus_v1');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



app.engine('ejs', ejsMate); // to design ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({ secret: 'badsecert' }))
app.use(flash())
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.listen(3000, () => {
    console.log('Serving on Port 3000')
})

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/sents', paginate(Sentence), async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const sentences = res.paginatedResults;
        // const totalNum = await Sentence.countDocuments().exec()
        // console.log(totalNum)
        // console.log('############')
        // console.log(sentPag);
        // const sentences = await Sentence.find({})
        const labels = await Label.find({})
        // console.log(sentences[0]);
        res.render('sentences/sentence', { labels, sentences, page })
    } catch {
        console.log(error)
    }

});

app.use('/labels', labelRoutes);


app.post('/updatesentences', async (req, res) => {
    try {
        const { data } = req.body;
        console.log(data)
        const sentence = await Sentence.findById(data.sentNumber)
        const filter = { _id: data.sentNumber }
        const update = {}
        sentence.semanticLabel = data.semanticLabel
        sentence.isExtractable = data.isExtractable
        sentence.isSelfContanined = data.isSelfContanined
        // console.log(data)
        // console.log(data.updatedWordsAndIndx)
        for (let updWord of data.updatedWordsAndIndx) {
            let updSentIdx = parseInt(updWord[0]);
            // console.log(updWord)
            // console.log(sentence.sentWords[updSentIdx])
            sentence.sentWords[updSentIdx][1] = updWord[1]
        }
        // console.log(sentence)
        let updSent = await Sentence.findOneAndUpdate(filter, sentence, {
            new: true
        });
        req.flash('success', 'Successfully updated the sentence.')
        res.redirect('/sents?page=1')
    } catch {
        console.log(error)
    }

});

app.get('/sents/duplicate/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sent = await Sentence.findById(id)
        const newSent = new Sentence({
            sentNumber: sent.sentNumber,
            semanticLabel: sent.labelName,
            isExtractable: sent.isExtractable,
            isSelfContanined: sent.isSelfContanined,
            sentWords: sent.sentWords
        })
        // console.log(newSent)
        await newSent.save();
        res.redirect('/sents?page=1')
    } catch {
        console.log(error)
    }

})



// app.use('/sents', sentRoutes);