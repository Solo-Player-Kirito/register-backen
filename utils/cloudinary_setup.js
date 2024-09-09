const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Optional: specify a folder for uploaded files
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

cloudinary.config({
  cloud_name: "dgm07yv9g",
  api_key: "519773473144764",
  api_secret: "dzJa7LOTbizs2Gq5gVr7zdeN7cA", // Click 'View Credentials' below to copy your API secret
});

module.exports = { cloudinary, storage };
