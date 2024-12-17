const { userModel } = require("../models/training_model"); // Assuming userModel is in the same directory
const { courseModel } = require("../models/training_model");
// Function to add a new enrollment
function gen() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniqueId;

  uniqueId = Array.from(
    { length: 10 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");

  return uniqueId;
}
async function addEnrollment({
  name,
  age,
  phone,
  email,
  skills,
  qualification,
  state,
  city,
  address,
  pincode,
  courseInfo,
}) {
  try {
    let rollNo;

    do {
      rollNo = gen(); // Generate a new roll number
      const existingRoll = await userModel.findOne({ enrollId: rollNo });
      if (!existingRoll) break; // If roll number is unique, exit the loop
    } while (true);
    const date = new Date().toISOString();
    const enrollment = new userModel({
      name,
      age,
      phone,
      email,
      skills,
      qualification,
      state,
      city,
      address,
      pincode,
      courseInfo,
      enrollId: rollNo,
      time: date,
    });

    const data = await enrollment.save();

    if (!data) {
      return "Failed to enroll user";
    }
    return data;
  } catch (err) {
    console.error("Some error occurred while adding enrollment", err);
  }
}

// Function to delete an enrollment by ID
async function deleteEnrollmentById(id) {
  try {
    const enrollment = await userModel.findById(id);
    if (!enrollment) {
      return "enrollment not found to delete";
    }
    const del = await userModel.findByIdAndDelete(id);
    return del;
  } catch (err) {
    console.error("failed to delete the enrollment", err);
  }
}

// Function to update an enrollment
async function updateEnrollment({
  id,
  name,
  age,
  phone,
  email,
  skills,
  qualification,
  state,
  city,
  address,
  pincode,
  courseInfo,
}) {
  try {
    const enrollment = await userModel.findById(id);
    if (!enrollment) {
      return "no enrollment found to be updated";
    }
    const update = await userModel.findByIdAndUpdate(
      id,
      {
        name: name,
        age: age,
        phone: phone,
        email: email,
        skills: skills,
        qualification: qualification,
        state: state,
        city: city,
        address: address,
        pincode: pincode,
        courseInfo: courseInfo,
      },
      { new: true }
    );
    if (!update) {
      return "error while updating the enrollment fields";
    }
    return update;
  } catch (err) {
    console.error("failed to update the enrollment", err);
  }
}
// Function to fetch an enrollment by ID
async function fetchEnrollmentById(id) {
  try {
    const enrollment = await userModel.findById(id).populate("courseInfo");
    if (!enrollment) {
      return "enrollment not found";
    }
    return enrollment;
  } catch (err) {
    console.error("error while fetching the enrollment", err);
  }
}

// Function to fetch all enrollments
async function fetchAllEnrollments() {
  try {
    const data = await userModel.find().populate("courseInfo");
    if (data.length === 0) {
      return "no enrollments found";
    }
    return data;
  } catch (err) {
    console.error("error while fetching the enrollments", err);
  }
}

module.exports = {
  addEnrollment,
  deleteEnrollmentById,
  updateEnrollment,
  fetchEnrollmentById,
  fetchAllEnrollments,
};
