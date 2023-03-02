let mongoose = require("mongoose");
let contactModel = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Contact",
  }
);

module.exports = mongoose.model("Contact", contactModel);
