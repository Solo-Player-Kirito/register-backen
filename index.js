const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const DB = process.env.MONGODB_URI;
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
const userRoutes = require("./routes/route");
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world local, routes!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
