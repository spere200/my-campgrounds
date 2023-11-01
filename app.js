if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const MongoDBStore = require("connect-mongo")(session);

const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/my-camp";

// MONGOOSE
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connection established.");
});

// EXPRESS
const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(mongoSanitize());

const secret = process.env.SECRET || "developmentSecret";

const store = new MongoDBStore({
  url: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
}).on("error", function (e) {
  console.log("SESSION STORE ERROR");
});

// SESSION & FLASH
const sessionConfig = {
  store,
  name: "csid",
  secret,
  resave: false,
  saveUninitialized: true,
  // store: TODO change to actual production store eventually, currently default memory store
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

// AUTHENTICATION
// app.use(express.session()) has to be called before this, but it's
// already called in the session/flash section
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash middleware: This needs to go after serializeUser/deserializeUser,
// sinc the user info is set by those functions. Also, apparently html templates
// have access to whatever is stored in res.locals, which makes sense, because
// res IS my response, and what I send with res is an html template, so all this
// is doing is saying "add these values as accessible variables in the response
app.use((req, res, next) => {
  // console.log(req.query);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// EXPRESS ROUTES
app.get("/", (req, res) => {
  res.render("campgrounds/home");
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("campgrounds/error", { err });
});

const appPort = process.env.PORT || 3000;

app.listen(appPort, () => {
  console.log(`Listening on port ${appPort}`);
});
