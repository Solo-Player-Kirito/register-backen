const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary_setup");
const upload = multer({ storage });
const { User, Banner } = require("../models/user.models");

router.post("/upload/single", upload.single("profileImg"), async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imgurl = req.file.path;
    user.profileImg = imgurl;
    await user.save();

    res.json({ message: "Profile image uploaded successfully", imgurl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading profile image" });
  }
});

router.post(
  "/upload/multiple",
  upload.array("multiImg", 3),
  async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      const imgUrls = req.files.map((file) => file.path);
      user.multiImg.push(...imgUrls);
      await user.save();

      res.json({
        message: "Images uploaded successfully",
        imgUrls,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error uploading multiple images" });
    }
  }
);

// Single banner image upload
router.post("/upload/banner", upload.single("MainBanner"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imgurl = req.file.path;

    let banner = await Banner.findOne();

    if (!banner) {
      banner = new Banner({ MainBanner: imgurl });
    } else {
      banner.MainBanner.push(imgurl);
    }

    await banner.save();

    res.json({
      message: "Banner image uploaded and appended successfully",
      MainBanner: banner.MainBanner,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading banner image" });
  }
});

// Get all banners
router.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find();
    if (banners.length === 0) {
      return res.status(404).json({ message: "No banners found" });
    }

    res.json({ banners });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving banners" });
  }
});

router.delete("/del/ban", async (req, res) => {
  try {
    console.log("error 1");
    const { _id } = req.body;
    console.log("error 2");

    if (_id) {
      console.log("error 3", _id);
      return res.status(400).json({ message: "Please provide a banner ID" });
    }
    console.log("error 4");

    await Banner.findByIdAndDelete(_id);
    console.log("error 5");

    console.log("error 6");
    res.json({
      message: "All images deleted successfully from the banner",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error clearing banner images" });
  }
});

module.exports = router;
