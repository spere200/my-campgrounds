const Campground = require('./models/campground');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError');
const joi = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in to do that.');
        res.redirect('/login');
    }
    else {
        next();
    }
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    req.body.campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    // console.log(req.body);

    // Joi validation
    const { error } = joi.campgroundJSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (campground && campground.author.equals(req.user._id)) {
        res.locals.foundCampground = campground;
        next();
    }
    else {
        req.flash('error', 'Permission denied');
        res.redirect(`/campgrounds/${id}`);
    }
}

module.exports.validateReview = (req, res, next) => {
    // Joi validation
    const { error } = joi.reviewJSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next(error);
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);

    if(review && review.author.equals(req.user._id)){
        next()
    }
    else{
        req.flash('error', 'Permission denied.');
        res.redirect(`/campgrounds/${id}`)
    }
}
