let mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
let user = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "username is required",
    },
    password: {
      type: String,
      default: "",
      trim: true,
      required: "password is required",
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email is required",
    },
    firstName: {
      type: String,
      default: "",
      trim: true,
      required: "firstName is required",
    },
    lastName: {
      type: String,
      default: "",
      trim: true,
      required: "lastName is required",
    },
    tel: {
      type: String,
      default: "",
      trim: true,
      required: "tel is required",
    },
  },
  {
    collection: "user",
  }
);
let options = { missingPasswordError: "wrong/Missing Password" };
user.plugin(passportLocalMongoose, options);
module.exports = mongoose.model("user", user);
