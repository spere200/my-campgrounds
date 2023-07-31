const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const {storeReturnTo} = require('../middleware');

router.get('/register', (req, res, next) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body.user;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err)
            }
            else{
                req.flash('success', 'You are now logged in.');
                res.redirect('/campgrounds');
            }
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res, next) => {
    res.render('users/login');
});

// passport.authenticate wipes anything stored on the session for security reasons, so storeReturnTo
// takes whatever is stored in the session and transfers it to the response locals (res.local), so
// that the url the user was on can be stored before passport.authenticate wipes it.
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res, next) => {
    req.flash('success', 'Successfully logged in.');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        else {
            req.flash('success', 'Logged out succesfully.');
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;
