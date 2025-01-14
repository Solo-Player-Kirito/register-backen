const mongoose = require("mongoose");
const schema = mongoose.Schema;
const blogSchema = new schema(
  {
    banner: String,
    title: String,
    description: String,
    publishTime: {
      type: Date,
      default: Date.now,
    },
    author: String,
  },
  { timestamps: true }
);
const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;
