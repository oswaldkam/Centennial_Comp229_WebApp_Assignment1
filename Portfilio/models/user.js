let mongoose = require("mongoose");
let userModel = mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    tel: String,
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model("user", userModel);
