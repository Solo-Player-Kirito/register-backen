const { kidsModel, orpModel } = require("../models/user.models");
const express = require("express");
const router = express.Router();
const { storage } = require("../utils/cloudinary_setup");
const multer = require("multer");
const upload = multer({ storage });

router.get("/c", (req, res) => {
  res.send("server working for oures");
});

// Get all orphanages with populated kids
router.get("/all/orphanages", async (req, res) => {
  try {
    const orphanages = await orpModel.find().populate("kids");
    res.json({ orphanages });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching orphanages" });
  }
});

// Add a new orphanage
router.post(
  "/add/orphanage",
  upload.array("orpPhotos", 5),
  async (req, res) => {
    try {
      const { name, address, location } = req.body;
      const files = req.files;

      if (!name || !address || !location) {
        return res
          .status(400)
          .send("All fields are mandatory: name, address, location");
      }

      const orphanageExists = await orpModel.findOne({ name });
      if (orphanageExists) {
        return res.status(400).send("Orphanage already exists");
      }

      if (!files) {
        return res.status(400).send("Please select at least one image. ");
      }

      const imgUrls = files.map((file) => file.path);

      const newOrphanage = new orpModel({
        name,
        address,
        location,
        orpPhotos: imgUrls,
      });

      const savedOrphanage = await newOrphanage.save();
      res.status(201).json({
        info: "Orphanage saved successfully",
        orphanage: savedOrphanage,
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while saving the orphanage" });
    }
  }
);

// Add a new kid
router.post("/add/kid", upload.array("kidPhoto", 5), async (req, res) => {
  try {
    const { name, age, home, story, gender, height } = req.body;
    const files = req.files;

    if (!files) {
      return res.status(400).send(" Please upload at least one photo");
    }

    if (!home || !age || !name) {
      return res.status(400).send("All fields are mandatory: name, age, home");
    }

    // Find orphanage by name
    const orphanage = await orpModel.findOne({ name: home });
    if (!orphanage) {
      return res.status(404).send("Orphanage does not exist");
    }

    // Map uploaded file paths to kidPhoto
    const url = files.map((file) => file.path);

    // Create and save the new kid
    const newKid = new kidsModel({
      name,
      age,
      home: orphanage._id,
      kidPhoto: url,
      story,
      gender,
      height,
    });

    const savedKid = await newKid.save();

    // Update orphanage with new kid information
    orphanage.kids.push(savedKid._id);
    orphanage.totalKids = orphanage.kids.length;
    await orphanage.save();

    // Send response back with saved kid details
    res.status(201).json({
      info: "Kid saved successfully",
      kid: savedKid,
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: "An error occurred while saving the kid" });
  }
});

router.delete("/delete/orphanage", async (req, res) => {
  try {
    const { name } = req.body;
    // console.log("working 1");
    await orpModel.deleteOne({ name: name });
    // await kidsModel.deleteMany({ isAdopted: false });
    // console.log("working 2");
    res.send("deleted");
    // console.log("working 3");
  } catch (err) {
    res.send("try not working");
  }
});
router.delete("/delete/kid", async (req, res) => {
  const { name } = req.body;
  const kid = await kidsModel.deleteMany({ name: name });
  res.json({
    info: "deleted kid",
    name: kid.name,
  });
});

module.exports = router;
