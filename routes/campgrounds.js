// IMPORTS
const express = require('express');
const router = express.Router();
const joi = require('../schemas');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

// MODELS
const Campground = require('../models/campground');

// MIDDLEWARE FUNCTIONS
const validateCampground = (req, res, next) => {
    // Joi validation
    const { error } = joi.campgroundJSchema.validate(req.body);
    
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

// CAMPGROUND ROUTES
router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('../views/campgrounds/index', { campgrounds });
}));

router.get('/new', (req, res) => {
    res.render('../views/campgrounds/new');
});

router.post('/', validateCampground, catchAsync(async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Campground successfully created.');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('../views/campgrounds/edit', { campground })
}));

router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if(!campground){
        req.flash('error', 'Invalid campground ID.')
        res.redirect('/campgrounds')
    }
    res.render('../views/campgrounds/show', { campground });
}));

router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    if(!campground){
        req.flash('error', 'Invalid campground ID.')
        res.redirect('/campgrounds')
    }
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground successfully deleted.');
    res.redirect('/campgrounds');
}));

module.exports = router;
