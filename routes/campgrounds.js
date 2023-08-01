// IMPORTS
const express = require('express');
const router = express.Router();
const joi = require('../schemas');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

// MODELS
const Campground = require('../models/campground');

// CAMPGROUND ROUTES
router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('../views/campgrounds/index', { campgrounds });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('../views/campgrounds/new');
});

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Campground successfully created.');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const campground = res.locals.foundCampground;
    res.render('../views/campgrounds/edit', { campground })
}));

router.get('/:id', catchAsync(async (req, res) => {
    // to populate nested fields, you need to use an object with path set to the object ref
    // to populate, and then populate set to an object that specifies which field to populate
    // in that ref, if you want to keep populating you keep adding nested populate fields
    const campground = await Campground.findById(req.params.id)
                             .populate({path: 'reviews', populate: {path: 'author'}})
                             .populate('author');
    if (!campground) {
        req.flash('error', 'Invalid campground ID.')
        res.redirect('/campgrounds')
    }
    res.render('../views/campgrounds/show', { campground });
}));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    // const { id } = req.params;
    // const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    const campground = res.locals.foundCampground;

    if (!campground) {
        req.flash('error', 'Invalid campground ID.')
        res.redirect('/campgrounds')
    }

    await campground.updateOne({ ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground successfully deleted.');
    res.redirect('/campgrounds');
}));

module.exports = router;
