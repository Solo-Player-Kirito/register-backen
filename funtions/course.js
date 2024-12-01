const { courseModel } = require("../models/training_model");

async function addCourse({ title, description, image, info, enabled, time }) {
  try {
    const course = new courseModel({
      title: title,
      description: description,
      image: image,
      info: info,
      enabled: enabled,
      time: time,
    });

    const data = await course.save();

    if (!data) {
      return "failed to add the course";
    }
    return data;
  } catch (err) {
    console.error("some error occured while adding the course", err);
  }
}

async function deleteCourseById(id) {
  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return "course not found ot delete";
    }
    const del = await courseModel.findByIdAndDelete(id);
    return del;
  } catch (err) {
    console.error("failed to delete the course", err);
  }
}
async function updateCourse({ id, title, description, image, info, enabled }) {
  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return "no course found to be updated";
    }
    const update = await courseModel.findByIdAndUpdate(
      id,
      {
        title: title,
        description: description,
        image: image,
        info: info,
        enabled: enabled,
      },
      { new: true }
    );
    if (!update) {
      return "error while updating the course fields";
    }
    return update;
  } catch (err) {
    console.error("failed to update the course");
  }
}
async function fetchCourseById(id) {
  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return "course not found";
    }
    return course;
  } catch (err) {
    console.error("error while fetching the course");
  }
}
async function fetchAllCourses() {
  try {
    const data = await courseModel.find();
    if (!data) {
      return "no courses found";
    }
    return data;
  } catch (err) {
    console.error("error while fetching the courses", err);
  }
}
module.exports = {
  addCourse,
  deleteCourseById,
  updateCourse,
  fetchCourseById,
  fetchAllCourses,
};