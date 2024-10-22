const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  city: String,
  phone: String,
  problem: String,
});

const appUser = new Schema({
  name: String,
  password: String,
  email: String,
});
const auth = mongoose.model("doctors-vicky", appUser);

const appMod = mongoose.model("appointment", userSchema);
module.exports = {
  auth,
  appMod,
};
