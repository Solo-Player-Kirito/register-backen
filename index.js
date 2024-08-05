const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const DB = process.env.MONGODB_URI;
mongoose
  .connect(DB)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
const userRoutes = require("./routes/route");
app.use("/", userRoutes);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// app.use(express.static(path.join(__dirname, "img")));
// app.use(express.static(path.join(__dirname, "img")));
app.use("/img", express.static(path.join(__dirname, "img")));
app.get("/", (req, res) => {
  res.send(" 5 - 8 -24 7pm");
});
// JavaScript to dynamically add the image to the container
// document.addEventListener("DOMContentLoaded", function () {
//   const imgContainer = document.getElementById("image-container");
//   const img = document.createElement("img");
//   img.src = "img/img.jpg"; // Use the correct relative path to the image
//   img.alt = "Centered Image";
//   imgContainer.appendChild(img);
// });
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
