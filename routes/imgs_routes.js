const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../utils/cloudinary_setup");
const upload = multer({ storage });
const User = require("../models/user.models");

router.get("/img", (req, res) => {
  res.send("working");
});

router.post("/upload/single", upload.single("profileImg"), async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("not found user");
    }

    const imgurl = req.file.path;

    user.profileImg = imgurl;
    await user.save();
    res.send(imgurl);
  } catch (err) {
    res.send("not working upload");
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
        return res.send("user not exists to save his photos");
      }
      const imgUrls = req.files.map((file) => file.path);
      user.multiImg = imgUrls;
      await user.save();
      res.send(imgUrls);
    } catch (err) {
      res.send("not working multi image");
    }
  }
);

module.exports = router;
