const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("../views/campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("../views/campgrounds/new");
};

module.exports.create = async (req, res, next) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Campground successfully created.");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.renderEditForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);

  if (!campground) {
    req.flash("error", "Cannot find that campground.");
    return res.redirect("/campgrounds");
  }

  res.render("../views/campgrounds/edit", { campground });
};

module.exports.show = async (req, res) => {
  // to populate nested fields, you need to use an object with path set to the object ref
  // to populate, and then populate set to an object that specifies which field to populate
  // in that ref, if you want to keep populating you keep adding nested populate fields
  const campground = await Campground.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  if (!campground) {
    req.flash("error", "Invalid campground ID.");
    res.redirect("/campgrounds");
  }
  res.render("../views/campgrounds/show", { campground });
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);

  // at least 1 image must remain
  if (
    req.body.deleteImages &&
    req.body.deleteImages.length == campground.images.length
  ) {
    req.flash("error", "At least one image must remain.");
    return res.redirect(`/campgrounds/${campground._id}`);
  }

  const oldImages = [...campground.images];
  await campground.updateOne({ ...req.body.campground });
  campground.images.push(...oldImages);
  await campground.save();

  // deleting images with the request data passed in the deleteImages array
  if (req.body.deleteImages) {
    // delete from cloudinary
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }

    // delete from mongo
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }

  req.flash("success", "Successfully updated campground.");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Campground successfully deleted.");
  res.redirect("/campgrounds");
};
