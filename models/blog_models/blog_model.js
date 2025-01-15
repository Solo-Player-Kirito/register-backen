const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogSchema = new schema(
  {
    banner: String,
    bannerAlt: String,
    title: String,
    metaTitle: String,
    description: String,
    metaDescription: String,
    publishTime: {
      type: Date,
      default: Date.now,
    },
    author: String,
    category: String,
    tages: [
      {
        type: String,
      },
    ],
    focusKeywords: [
      {
        type: String,
      },
    ],
  },

  { timestamps: true }
);
const blogModel = mongoose.model("blogs", blogSchema);

module.exports = blogModel;
