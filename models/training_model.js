const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema(
  {
    name: String,
    age: String,
    phone: String,
    email: String,
    skills: String,
    qualification: String,
    state: String,
    city: String,
    address: String,
    pincode: String,
    courseInfo: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
    time: String,
    enrollId: String,
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  info: String,
  enabled: {
    type: Boolean,
    default: true,
  },
  time: String,
});
const certificateSchema = new mongoose.Schema(
  {
    courseInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "training-users",
    },
    time: String,
    photo: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const certModel = mongoose.model("certificates", certificateSchema);
const courseModel = mongoose.model("courses", courseSchema);
const enrollModel = mongoose.model("training-users", enrollSchema);
module.exports = {
  certModel,
  courseModel,
  enrollModel,
};
