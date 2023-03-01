const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');



const labelRoutes = require('./routes/labelRoutes');
const sentsRoutes = require('./routes/sentencesRoutes');
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


app.use('/labels', labelRoutes);
app.use('/sents', sentsRoutes);

