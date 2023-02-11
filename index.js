const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');



// const sentRoutes = require('./routes/sentences');
const Label = require('./models/nlpLabels');
const Sentence = require('./models/sentence');


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

app.get('/sents', async (req, res) => {
    try {
        const labels = await Label.find({});
        const sentences = await Sentence.find({})
        // console.log(sentences[0]);
        res.render('sentences/sentence', { labels, sentences })
    } catch {
        console.log(error)
    }

});

app.get('/labels/:id', async (req, res) => {
    try {
        const labels = await Label.find({});
        res.render('labels/label', { labels })
    } catch {
        console.log(error)
    }

});

app.post('/labels/:id/semantic', async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Label.findById(id)
        const { label } = req.body;
        // console.log(labels.semanticLabels);
        if (label.name !== '') {
            labels.semanticLabels.push({ 'name': label.name });
            await labels.save();
        }
        req.flash('success', 'Successfully add a new tag.')
        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }

});


app.post('/labels/:id/syntactic', async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Label.findById(id)
        const { label } = req.body;
        // console.log(labels);
        if (label.name !== '') {
            labels.phraseLabels.push({ 'name': label.name });
            await labels.save();
        }
        req.flash('success', 'Successfully add a new tag.')
        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }

});

app.delete('/labels/:id/semantic', async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Label.findById(id)
        const { label } = req.body;
        labels.semanticLabels.pull({ 'name': label.name });
        await labels.save();
        // console.log(labels.semanticLabels);

        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }

});

app.delete('/labels/:id/syntactic', async (req, res) => {
    try {
        const { id } = req.params;
        const labels = await Label.findById(id)
        const { label } = req.body;
        labels.phraseLabels.pull({ 'name': label.name });
        await labels.save();
        // console.log(labels.semanticLabels);
        res.redirect(`/labels/{id}`)
    } catch {
        console.log(error)
    }

});

app.post('/updatesentences', async (req, res) => {
    try {
        const { data } = req.body;
        const sentence = await Sentence.findById(data.sentNumber)
        const filter = { _id: data.sentNumber }
        const update = {}
        sentence.semanticLabel = data.semanticLabel
        sentence.isExtractable = data.isExtractable
        sentence.isSelfContanined = data.isSelfContanined
        for (let updWord of data.updatedWordsAndIndx) {
            console.log(sentence.sentWords[updWord[0]][1])
            sentence.sentWords[updWord[0]][1] = updWord[1]
        }
        let updSent = await Sentence.findOneAndUpdate(filter, sentence, {
            new: true
        });
        req.flash('success', 'Successfully updated the sentence.')
        res.redirect('/sents')
    } catch {
        console.log(error)
    }

});



// app.use('/sents', sentRoutes);