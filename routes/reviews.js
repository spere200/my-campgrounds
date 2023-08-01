// IMPORTS
const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const {validateReview} = require('../middleware');

// MODELS
const Campground = require('../models/campground');
const Review = require('../models/review');

// REVIEW ROUTES
router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Review created successfully.');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId', async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, { $pull: { reviews: req.params.reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Review deleted successfully.');
    res.redirect(`/campgrounds/${req.params.id}`);
});

module.exports = router;