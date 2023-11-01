// IMPORTS
const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");

const { storage } = require("../cloudinary/index");
const multer = require("multer");
const upload = multer({ storage });

// router.post('/', upload.array('campground[image]'),(req, res) => {
//     res.send({body: req.body, files: req.files});
//     // res.send(req.files.map(f => ({url: f.path, filename: f.filename})));
// });

// CAMPGROUND ROUTES
router.get("/", catchAsync(campgrounds.index));
router.get("/new", isLoggedIn, campgrounds.renderNewForm);
router.post(
  "/",
  isLoggedIn,
  upload.array("campground[images]"),
  validateCampground,
  catchAsync(campgrounds.create)
);
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);
router.put(
  "/:id",
  isLoggedIn,
  upload.array("campground[images]"),
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.edit)
);
router.get("/:id", catchAsync(campgrounds.show));
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

module.exports = router;
