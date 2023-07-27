// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');

// MONGOOSE
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connection established.');
});

// EXPRESS
const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'temporary',
    resave: false,
    saveUninitialized: true,
    // store: TODO change to actual production store eventually, currently default memory store
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
        maxAge: (1000 * 60 * 60 * 24 * 7)
    }
};
app.use(session(sessionConfig));

// ROUTES
app.get('/', (req, res) => {
    res.render('campgrounds/home');
});

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('campgrounds/error', { err });
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});