const express = require("express");
const multer = require("multer");
const { storage } = require("../../utils/cloudinary_setup");
const upload = multer({ storage });

const {
  addEnrollment,
  deleteEnrollmentById,
  updateEnrollment,
  fetchEnrollmentById,
  fetchAllEnrollments,
} = require("../../funtions/users");

const router = express.Router();

// Route to add enrollment
router.post("/add/user", async (req, res) => {
  const {
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
  } = req.body;

  try {
    const data = await addEnrollment({
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
    });

    if (!data) {
      return res.status(400).send("Failed to save enrollment");
    }

    res.status(201).send(data);
  } catch (err) {
    console.log("Error while adding enrollment", err);
    res.status(500).send({ msg: "Failed to add enrollment", err });
  }
});

// Route to delete enrollment by ID
router.delete("/delete/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("ID is required to delete enrollment");
    }
    const data = await deleteEnrollmentById(id);
    if (!data) {
      return res.status(404).send("Enrollment not found");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log("Error while deleting enrollment", err);
    res.status(500).send("Failed to delete enrollment");
  }
});

// Route to update enrollment by ID
router.post("/update/user/:id", async (req, res) => {
  const { id } = req.params;
  const {
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
    historyMessage, // New: Extract message for history
  } = req.body;

  try {
    if (!id) {
      return res.status(400).send("ID is required to update enrollment");
    }

    // Call the updated updateEnrollment function
    const data = await updateEnrollment({
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
      historyMessage, // Pass the new parameter
    });

    if (!data) {
      return res.status(404).send("Enrollment not found");
    }

    res.status(200).send(data);
  } catch (err) {
    console.error("Error while updating enrollment", err);
    res.status(500).send("Failed to update enrollment");
  }
});

// Route to fetch enrollment by ID
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send("ID is required to fetch enrollment");
    }
    const data = await fetchEnrollmentById(id);
    if (!data) {
      return res.status(404).send("Enrollment not found");
    }
    res.status(200).send(data);
  } catch (err) {
    console.log("Error while fetching enrollment", err);
    res.status(500).send("Failed to fetch enrollment");
  }
});

// Route to fetch all enrollments
router.get("/users", async (req, res) => {
  try {
    const data = await fetchAllEnrollments();
    res.status(200).send(data);
  } catch (err) {
    console.log("Error while fetching enrollments", err);
    res.status(500).send("Failed to fetch enrollments");
  }
});

module.exports = router;
