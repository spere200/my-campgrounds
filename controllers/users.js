const User = require('../models/user');

module.exports.create = async (req, res, next) => {
    try {
        const { email, username, password } = req.body.user;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            else {
                req.flash('success', 'You are now logged in.');
                res.redirect('/campgrounds');
            }
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderRegisterForm = (req, res, next) => {
    res.render('users/register');
}

module.exports.renderLoginForm = (req, res, next) => {
    res.render('users/login');
}

module.exports.login = (req, res, next) => {
    req.flash('success', 'Successfully logged in.');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }
        else {
            req.flash('success', 'Logged out succesfully.');
            res.redirect('/campgrounds');
        }
    });
}