const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');



const ExpressError = require('./utils/expressErrors');
const labelRoutes = require('./routes/labelRoutes');
const sentsRoutes = require('./routes/sentencesRoutes');
// const Label = require('./models/nlpLabels');
// const Sentence = require('./models/sentence');
const paginate = require('./utils/pagination');
const { connect } = require('./db');



app.listen(3000, () => {
    console.log('Serving on Port 3000')
})



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


app.get('/', async (req, res) => {
    const collections = [];
    const db = await connect();
    await db.listCollections().forEach(collection => {
        collections.push(collection["name"])
    })
    res.render('home', { collections })
});


app.use('/labels', labelRoutes);
app.use('/sents', sentsRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('partials/errors', { err })
})

