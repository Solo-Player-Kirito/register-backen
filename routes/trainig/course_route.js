const multer = require("multer");
const { storage } = require("../../utils/cloudinary_setup");
const upload = multer({ storage });
const express = require("express");
const {
  addCourse,
  deleteCourseById,
  updateCourse,
  fetchCourseById,
  fetchAllCourses,
} = require("../../funtions/course");

const router = express.Router();

// Add a new course
router.post(
  "/add/course",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "posters", maxCount: 5 },
  ]),
  async (req, res) => {
    const {
      title,
      description,
      info,
      enabled,
      price,
      newPrice,
      duration,
      video,
    } = req.body;
    const files = req.files;
    try {
      if (!title || !description || !info) {
        return res.status(404).send("all fields are required");
      }
      const date = new Date().toISOString();

      const posters = {
        image1: files.posters?.[0]?.path || null,
        image2: files.posters?.[1]?.path || null,
        image3: files.posters?.[2]?.path || null,
        image4: files.posters?.[3]?.path || null,
        image5: files.posters?.[4]?.path || null,
      };

      const data = await addCourse({
        title,
        description,
        image: files.image?.[0]?.path || null,
        info,
        enabled,
        time: date,
        price,
        newPrice,
        duration,
        posters,
        video,
      });

      if (!data) {
        return res.status(400).send("Failed to save course");
      }

      res.send({ msg: "Success adding the course", data });
    } catch (err) {
      console.log("Error while adding the course", err);
      res.status(500).send({ msg: "Failed to add the course", err });
    }
  }
);

// Delete a course by ID
router.delete("/delete/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("ID is required to delete the course");
    }
    const data = await deleteCourseById(id);
    res.send({ msg: "Course deletion", data });
  } catch (err) {
    console.log("Failed to delete the course", err);
    res.status(500).send("Failed to delete the course");
  }
});

// Update a course by ID
router.post(
  "/update/course/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "posters", maxCount: 5 },
  ]),
  async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      info,
      enabled,
      price,
      newPrice,
      duration,
      video,
    } = req.body;
    const files = req.files;

    try {
      if (!id) {
        return res.status(400).send("ID is required to update the course");
      }

      const posters = files.posters
        ? {
            image1: files.posters[0]?.path || null,
            image2: files.posters[1]?.path || null,
            image3: files.posters[2]?.path || null,
            image4: files.posters[3]?.path || null,
            image5: files.posters[4]?.path || null,
          }
        : undefined;

      const data = await updateCourse({
        id,
        title,
        description,
        image: files.image?.[0]?.path || undefined,
        info,
        enabled,
        price,
        newPrice,
        duration,
        posters,
        video,
      });

      res.send({ msg: "Course updated successfully", data });
    } catch (err) {
      console.log("Error while updating the course", err);
      res.status(500).send({ msg: "Failed to update the course", err });
    }
  }
);

// Fetch a single course by ID
router.get("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("ID is required to fetch the course");
    }
    const data = await fetchCourseById(id);
    res.send(data);
  } catch (err) {
    console.log("Error while fetching the course", err);
    res.status(500).send("Failed to fetch the course");
  }
});

// Fetch all courses
router.get("/courses", async (req, res) => {
  try {
    const data = await fetchAllCourses();
    res.send(data);
  } catch (err) {
    console.log("Failed to fetch the courses", err);
    res.status(500).send("Failed to fetch courses");
  }
});

module.exports = router;
