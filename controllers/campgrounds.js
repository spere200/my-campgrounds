const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('../views/campgrounds/index', { campgrounds });
}

module.exports.renderNewForm = (req, res) => {
    res.render('../views/campgrounds/new');
}

module.exports.create = async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    // console.log(campground);
    req.flash('success', 'Campground successfully created.');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);

    if (!campground){
        req.flash('error', 'Cannot find that campground.');
        return res.redirect('/campgrounds');
    }

    res.render('../views/campgrounds/edit', { campground });
}

module.exports.show = async (req, res) => {
    // to populate nested fields, you need to use an object with path set to the object ref
    // to populate, and then populate set to an object that specifies which field to populate
    // in that ref, if you want to keep populating you keep adding nested populate fields
    const campground = await Campground.findById(req.params.id)
                                       .populate({ path: 'reviews', populate: { path: 'author' } })
                                       .populate('author');
    if (!campground) {
        req.flash('error', 'Invalid campground ID.')
        res.redirect('/campgrounds')
    }
    res.render('../views/campgrounds/show', { campground });
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const oldImages = campground.images;
    await campground.updateOne({...req.body.campground});
    campground.images.push(...oldImages);
    await campground.save();

    req.flash('success', 'Successfully updated campground.')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground successfully deleted.');
    res.redirect('/campgrounds');
}