// IMPORTS
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');

// CAMPGROUND ROUTES
router.get('/', catchAsync(campgrounds.index));
router.get('/new', isLoggedIn, campgrounds.renderNewForm);
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.create));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.edit));
router.get('/:id', catchAsync(campgrounds.show));
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

module.exports = router;
