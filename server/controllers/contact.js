let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
//create a reference to the db Schema which is the model
let Contact = require("../models/contacts");

//we want to display the contactList
module.exports.displayContactList = (req, res, next) => {
  Contact.find()
    .sort({ lastName: "asc" })
    .exec((err, contactList) => {
      if (err) {
        return console.error(err);
      } else {
        //console.log(contactList);
        res.render("contact/list", {
          title: "Contacts",
          contactList: contactList,
          displayName: req.user ? req.user.displayName : "",
        });
      }
    });
};
module.exports.displayAddPage = (req, res, next) => {
  res.render("contact/add", {
    title: "Add Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.processAddPage = (req, res, next) => {
  console.log(req.body);
  let newContact = Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
  });
  Contact.create(newContact, (err, contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/contact/list");
    }
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  Contact.findById(id, (err, contactToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("contact/edit", {
        title: "Edit Contact",
        contact: contactToEdit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;
  let updatedContact = Contact({
    _id: id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
  });
  console.log("req.body.price", req.body);
  Contact.updateOne({ _id: id }, updatedContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //console.log(contactList);
      res.redirect("/contact/list");
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/contact/list");
    }
  });
};
