const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("user", User);
module.exports = model;
