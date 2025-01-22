const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    name: String,
    age: String,
    qualification: String,
    other: String,
    email: String,
    phone: String,
    address: String,
    resume: String,
    experience: String,
    skills: [String],
    dateOfApplication: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const jobModel = mongoose.model("JobApplication", jobSchema);
module.exports = jobModel
