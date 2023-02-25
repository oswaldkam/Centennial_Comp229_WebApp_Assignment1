var projectData = require("../data/projectData");
var servicesData = require("../data/servicesData");
var express = require("express");
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("basePage", { title: "Home", page: "home", data: null });
});
router.get("/aboutMe", function (req, res, next) {
  res.render("basePage", { title: "About Me", page: "aboutMe", data: null });
});
router.get("/services", function (req, res, next) {
  res.render("basePage", {
    title: "Services",
    page: "services",
    data: servicesData.services,
  });
});
router.get("/projects", function (req, res, next) {
  res.render("basePage", {
    title: "Project",
    page: "projects",
    data: projectData.projectData,
  });
});
router.get("/contact", function (req, res, next) {
  res.render("basePage", { title: "Contact", page: "contact", data: null });
});
router.get("/404", function (req, res, next) {
  res.render("basePage", { title: "Page not found", page: "404", data: null });
});
router.get("/500", function (req, res, next) {
  res.render("basePage", { title: "Error", page: "500", data: null });
});
router.get("/contact", function (req, res, next) {
  res.render("basePage", { title: "Contact", page: "contact", data: null });
});
router.get("/login", function (req, res, next) {
  res.render("basePage", { title: "Login", page: "login", data: null });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    console.log(req.user);
    res.redirect("/contact");
  }
);
module.exports = router;
