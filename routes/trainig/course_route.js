const express = require("express");
const multer = require("multer");
const { storage } = require("../../utils/cloudinary_setup");
const {
  addCourse,
  deleteCourseById,
  updateCourse,
  fetchCourseById,
  fetchAllCourses,
} = require("../../funtions/course");

const upload = multer({ storage });
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
      review,
      price,
      newPrice,
      duration,
      video,
    } = req.body;
    const files = req.files;

    try {
      // Validate required fields
      if (!title || !description || !info) {
        return res.status(400).json({
          message: "Title, description, info, and price are required.",
        });
      }

      const date = new Date();

      // Construct posters object with null values if not provided
      const posters = {
        image1: files.posters?.[0]?.path || null,
        image2: files.posters?.[1]?.path || null,
        image3: files.posters?.[2]?.path || null,
        image4: files.posters?.[3]?.path || null,
        image5: files.posters?.[4]?.path || null,
      };

      const courseData = {
        title,
        description,
        image: files.image?.[0]?.path || null,
        info,
        enabled:
          enabled !== undefined ? enabled === "true" || enabled === true : true, // Parse as Boolean
        time: date,
        price,
        newPrice,
        duration,
        posters,
        video,
        review,
      };

      const data = await addCourse(courseData);

      res.status(201).json({ message: "Course added successfully.", data }); // Include a success message
    } catch (err) {
      console.error("Error while adding the course:", err);
      res
        .status(500)
        .json({ message: "Failed to add the course.", error: err.message });
    }
  }
);

// Delete a course by ID
router.delete("/delete/course/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "Course ID is required to delete the course." });
    }

    const data = await deleteCourseById(id);

    if (!data) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json({ message: "Course deleted successfully.", data });
  } catch (err) {
    console.error("Failed to delete the course:", err);
    res
      .status(500)
      .json({ message: "Failed to delete the course.", error: err.message });
  }
});

// Update a course by ID
router.put(
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
      review,
    } = req.body;
    const files = req.files;

    try {
      if (!id) {
        return res
          .status(400)
          .json({ message: "Course ID is required to update the course." });
      }

      // Construct posters object if posters are provided
      const posters = files.posters
        ? {
            image1: files.posters[0]?.path || null,
            image2: files.posters[1]?.path || null,
            image3: files.posters[2]?.path || null,
            image4: files.posters[3]?.path || null,
            image5: files.posters[4]?.path || null,
          }
        : undefined;

      // Prepare update data
      const updateData = {
        id,
        title,
        description,
        image: files.image?.[0]?.path,
        info,
        enabled: enabled !== undefined ? enabled : undefined,
        price,
        newPrice,
        duration,
        posters,
        video,
        review,
      };

      // Remove undefined fields
      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );

      const data = await updateCourse(updateData);

      if (!data) {
        return res
          .status(404)
          .json({ message: "Course not found or no changes made." });
      }

      res.json({ message: "Course updated successfully.", data });
    } catch (err) {
      console.error("Error while updating the course:", err);
      res
        .status(500)
        .json({ message: "Failed to update the course.", error: err.message });
    }
  }
);

// Fetch a single course by ID
router.get("/course/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ message: "Course ID is required to fetch the course." });
    }

    const data = await fetchCourseById(id);

    if (!data) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.json(data);
  } catch (err) {
    console.error("Error while fetching the course:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch the course.", error: err.message });
  }
});

// Fetch all courses
router.get("/courses", async (req, res) => {
  try {
    const data = await fetchAllCourses();
    res.json(data);
  } catch (err) {
    console.error("Failed to fetch the courses:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch courses.", error: err.message });
  }
});

module.exports = router;
