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
  .then(() => console.log("Database connected successfully "))
  .catch((err) => console.error("Database connection error:", err));

// Routes
const userRoutes = require("./routes/route");
const imgroutes = require("./routes/imgs_routes");
const orph = require("./routes/orphanage");
app.use("/", imgroutes);
app.use("/", userRoutes);
app.use("/", orph);

app.use("/img", express.static(path.join(__dirname, "img")));
app.get("/", (req, res) => {
  res.send("some response changes on 28-09-2024 ");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
