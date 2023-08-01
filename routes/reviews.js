// IMPORTS
const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

// REVIEW ROUTES
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.create));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.delete));

// since there is now show page for reviews, this is here as a catch all for returnTo
router.get('*', reviews.returnTo);

module.exports = router;