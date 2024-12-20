// const { courseModel } = require("../models/training_model");
const { courseModel } = require("../models/training_model");

function gen() {
  const characters = "Q789LKJHGFDSA654ZXCVBNM1230@#$&";
  let uniqueId;

  uniqueId = Array.from(
    { length: 10 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");

  return uniqueId;
}

async function addCourse({
  title,
  description,
  image,
  info,
  enabled,
  time,
  price,
  newPrice,
  duration,
  posters,
  video,
  review,
}) {
  try {
    let id = gen();
    const course = new courseModel({
      title,
      description,
      image,
      info,
      enabled,
      time,
      CourseId: id,
      price,
      newPrice,
      duration,
      posters,
      video,
      review,
    });

    const data = await course.save();

    if (!data) {
      return "failed to add the course";
    }
    return data;
  } catch (err) {
    console.error("some error occurred while adding the course", err);
  }
}

async function deleteCourseById(id) {
  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return "course not found to delete";
    }
    const del = await courseModel.findByIdAndDelete(id);
    return del;
  } catch (err) {
    console.error("failed to delete the course", err);
  }
}

async function updateCourse({
  id,
  title,
  description,
  image,
  info,
  enabled,
  price,
  newPrice,
  duration,
  posters,
  video,
  review,
}) {
  try {
    const course = await courseModel.findById(id);
    if (!course) {
      return "no course found to be updated";
    }
    const update = await courseModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
        info,
        enabled,
        price,
        newPrice,
        duration,
        posters,
        video,
        review,
      },
      { new: true }
    );
    if (!update) {
      return "error while updating the course fields";
    }
    return update;
  } catch (err) {
    console.error("failed to update the course", err);
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
    console.error("error while fetching the course", err);
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
