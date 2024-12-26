const { BannerModel } = require("../models/training_model");
const multer = require("multer");
const { storage } = require("../utils/cloudinary_setup");
const upload = multer({ storage });
const express = require("express");
const router = express.Router();

router.post(
  "/training/banner/add",
  upload.single("banners"),
  async (req, res) => {
    const file = req.file;
    const { name, isEnabled } = req.body;
    try {
      if (!file) {
        return res.status(400).send("Please add the file");
      }

      const ban = new BannerModel({
        banners: file.path,
        name: name,
        isEnabled: isEnabled,
      });
      const data = await ban.save();
      res.status(201).send(data);
    } catch (err) {
      console.error("Error occurred while adding the banner:", err);
      res.status(500).send("Failed to add the banner");
    }
  }
);

router.get("/training/banner", async (req, res) => {
  try {
    const banners = await BannerModel.find();
    res.status(200).send(banners);
  } catch (err) {
    console.error("Error occurred while fetching banners:", err);
    res.status(500).send("Failed to fetch banners");
  }
});

router.post(
  "/training/banner/update/:id",
  upload.single("banners"),
  async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    const { name, isEnabled } = req.body;

    try {
      // Build the update object dynamically based on the request
      const updateData = {};
      if (file) {
        updateData.banners = file.path; // Update the banner image if a new file is provided
      }
      if (name) {
        updateData.name = name; // Update the name if provided
      }
      if (isEnabled !== undefined) {
        updateData.isEnabled = isEnabled; // Update the isEnabled field if provided
      }

      const updatedBanner = await BannerModel.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedBanner) {
        return res.status(404).send("Banner not found");
      }

      res.status(200).send(updatedBanner);
    } catch (err) {
      console.error("Error occurred while updating the banner:", err);
      res.status(500).send("Failed to update the banner");
    }
  }
);

router.delete("/training/banner/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBanner = await BannerModel.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).send("Banner not found");
    }

    res
      .status(200)
      .send({ message: "Banner deleted successfully", deletedBanner });
  } catch (err) {
    console.error("Error occurred while deleting the banner:", err);
    res.status(500).send("Failed to delete the banner");
  }
});

module.exports = router;
