const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const DB = process.env.MONGODB_URI;
mongoose
  .connect(DB)
  .then(() => console.log("Database connected successfully "))
  .catch((err) => console.error("Database connection error:", err));
const userRoutes = require("./routes/route");
app.use("/", userRoutes);
app.get("/", (req, res) => {
  res.send("some response changes on 28-09-2024 ");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
