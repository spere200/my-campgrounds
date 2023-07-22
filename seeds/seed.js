const mongoose = require('mongoose');
const Campground = require('../models/campground');
const createCityPropObj = require('./seedHelper');

// mongoose
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connection established.');
});

const seedDB = async (numCamps=5) => {
    await Campground.deleteMany({});
    
    for(let i = 0; i < numCamps; i++){
        const propObj = createCityPropObj();
        const c = new Campground(propObj);
        await c.save();
        console.log(`${propObj.title} added.`);
    }

    console.log('Finished Seeding');
}

seedDB(50).then(() => {
    db.close();
});
