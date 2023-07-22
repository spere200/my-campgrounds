// imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// models
const Campground = require('./models/campground');

// mongoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connection established.');
});

// express
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'Backyard', price: 5, description: "As cheap as it gets."});
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})