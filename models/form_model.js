const mongoose = require("mongoose");
const schema = mongoose.Schema;
const formSchema = new schema({
  name: String,
  phone: String,
  email: String,
  message: String,
  submitDate: String,
});
const formModel = mongoose.model("form", formSchema);

module.exports = formModel;
