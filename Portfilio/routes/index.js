var projectData = require("../data/projectData");
var servicesData = require("../data/servicesData");
var express = require("express");
var router = express.Router();
var passport = require("passport");
const contact = require("../models/contact");

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

router.get("/contactList", checkAuthenticated, async function (req, res, next) {
  const contacts = await contact.find();
  res.render("basePage", {
    title: "Contact List",
    page: "contactList/list",
    data: { contacts: contacts },
  });
});
router.get(
  "/contactList/edit/:id",
  checkAuthenticated,
  async function (req, res, next) {
    const result = await contact.findById(req.params.id);
    res.render("basePage", {
      title: "Contact edit",
      page: "contactList/edit",
      data: { contacts: result },
    });
  }
);

// API
// Contact list operation
router.post("/contactList/:id", checkAuthenticated, function (req, res, next) {
  const { firstName, lastName, phone, email } = req.body;
  console.log("fffgff", firstName, lastName, phone, email);
  contact.findByIdAndUpdate(
    req.params.id,
    {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  );
  res.redirect("/contactList");
});
router.delete(
  "/contactList/:id",
  checkAuthenticated,
  function (req, res, next) {
    contact.findByIdAndRemove(req.params.id, function (err, docs) {
      if (err) {
        console.log(err);
        res.json({ success: false, error: JSON.stringify(err) });
      } else {
        console.log("Delete User : ", docs);
        res.json({ success: true, error: "" });
      }
    });
  }
);

// Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/contactList",
  })
);
// Check is logined
function checkAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
