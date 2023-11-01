const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

router.get("/register", users.renderRegisterForm);
router.post("/register", catchAsync(users.create));
router.get("/login", users.renderLoginForm);

// passport.authenticate wipes anything stored on the session for security reasons, so storeReturnTo
// takes whatever is stored in the session and transfers it to the response locals (res.local), so
// that the url the user was on can be stored before passport.authenticate wipes it.
router.post(
  "/login",
  storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.login
);

router.get("/logout", users.logout);

module.exports = router;
