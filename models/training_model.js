const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    history: [
      {
        message: String,
        time: { type: Date, default: Date.now },
      },
    ],
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
  CourseId: {
    type: String,
    unique: true,
  },
  price: String,
  newPrice: String,
  duration: String,
  posters: {
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
  },
  video: String,
  review: String,
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
    // photo: String,
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const certModel = mongoose.model("certificates", certificateSchema);
const courseModel = mongoose.model("courses", courseSchema);
const userModel = mongoose.model("training-users", userSchema);
module.exports = {
  certModel,
  courseModel,
  userModel,
};
