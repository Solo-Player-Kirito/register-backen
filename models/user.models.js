const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  profileImg: String,
  multiImg: {
    type: [String],
  },
});

module.exports = mongoose.model("user", newSchema);
