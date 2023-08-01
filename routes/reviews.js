// IMPORTS
const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

// REVIEW ROUTES
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.create));
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.delete));
router.get('*', reviews.returnTo); // only here to have a safe returnTo in some edge cases

module.exports = router;