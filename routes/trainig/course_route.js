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

router.post("/add/course", upload.single("image"), async (req, res) => {
  const { title, description, info, enabled } = req.body;
  const file = req.file;
  try {
    const img = file.path;
    const date = new Date().toLocaleString();
    const data = await addCourse({
      title,
      description,
      image: img,
      info,
      enabled,
      time: date,
    });

    if (!data) {
      return res.send("Failed to save course");
    }

    res.send({ msg: "Success adding the course", data });
  } catch (err) {
    console.log("Error while adding the course", err);
    res.status(500).send({ msg: "Failed to add the course", err });
  }
});
router.delete("/delete/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.send("id is required to delete the course");
    }
    const data = await deleteCourseById(id);
    res.status(201).send({ msg: "course deletion", data });
  } catch (err) {
    console.log("failed to delete the course");
    res.send("failed to delete the course");
  }
});
router.post("/update/course/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { title, description, info, enabled } = req.body;
  try {
    if (!id) {
      return res.send("id is required to update the course");
    }
    if (req.file) {
      const img = req.file.path;

      const data = await updateCourse({
        id,
        title,
        description,
        image: img,
        info,
        enabled,
      });
      res.send({ msg: "course update", data });
    } else {
      const data = await updateCourse({
        id,
        title,
        description,

        info,
        enabled,
      });
      res.send({ msg: "course update", data });
    }
  } catch (err) {
    console.log("error while updating the course 2", err);
    res.status(500).send({ msg: "failed to update the course", err });
  }
});

router.get("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.send("id is required to delete");
    }
    const data = await fetchCourseById(id);
    res.send({ msg: "fetch course", data });
  } catch (err) {
    console.log("error while fethcing the course", err);
    res.status(500).send("faild to fetch the course");
  }
});

router.get("/courses", async (req, res) => {
  try {
    const data = await fetchAllCourses();
    res.send({ msg: "fetched courses", data });
  } catch (err) {
    console.log("failed to fetch the courses", err);
    res.status(500).send("failed to fetch courses", err);
  }
});
module.exports = router;
