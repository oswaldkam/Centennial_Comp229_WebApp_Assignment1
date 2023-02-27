var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var mongoose = require("mongoose");
const session = require("express-session");
var LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

var DB = require("./db");
var user = require("./models/user");
var contact = require("./models/contact");

var router = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use("/", router);

// login filter
// app.use(function (req, res, next) {
//   var msgs = req.session.messages || [];
//   res.locals.messages = msgs;
//   res.locals.hasMessages = !!msgs.length;
//   req.session.messages = [];
//   next();
// });
// app.use(function (req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.render("basePage", { title: "Page not found", page: "404", data: null });
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("basePage", { title: "Error", page: "500", data: null });
// });

// DB setup
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedtopology: true });
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("connected to MongoDB...");
});

// Initial db ensure there is a user
// user.deleteMany({});
// var result = user.create({
//   username: "user",
//   password: "password",
//   email: "hello@world.com",
//   firstName: "Peter",
//   lastName: "Griffin",
//   tel: "555-555-1234",
// });
contact.create({
  firstName: "foo",
  lastName: "bar",
  phone: "5555551234",
  email: "foo@bar.com",
});

// Passport JS username and password
passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    user.findOne(
      { username: username, password: password },
      function (err, obj) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }
      }
    );
  })
);

module.exports = app;
