const express = require("express");
const multer = require("multer");
const { storage } = require("../../utils/cloudinary_setup");
const upload = multer({ storage });

const router = express.Router();

module.exports = router;
