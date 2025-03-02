const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const schema = new mongoose.Schema({
  data: Object,
});
const wmodel = mongoose.model("webhoks", schema);

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
const form = require("./routes/form");
const course = require("./routes/trainig/course_route");
const enroll = require("./routes/trainig/user_route");
const certificate = require("./routes/trainig/certificate_routes");
const banner = require("./funtions/banners");
const blogs = require("./routes/blog_routes/blog_route");
const jobs = require("./routes/job_routes/job_routes");
app.use("/", form);
app.use("/", imgroutes);
app.use("/", userRoutes);
app.use("/", orph);
app.use("/", course);
app.use("/", enroll);
app.use("/", certificate);
app.use("/", banner);
app.use("/blogs", blogs);
app.use("/jobs", jobs);

app.use("/img", express.static(path.join(__dirname, "img")));
app.get("/", (req, res) => {
  res.send(" webhook test  : 02 - 03 - 2025 ");
});
app.post("/webhook", async (req, res) => {
  try {
    console.log("webhook ok listening : ");
    console.log(req.body);

    const data = await wmodel.create({
      data: req.body,
    });
    res.status(200).send("ok");
  } catch (err) {
    console.log("some error in the webhook : ", err);
    res.status(500).send("internal server error in the webhook : )");
  }
});
app.get("/web", async (req, res) => {
  try {
    const data = await wmodel.find();
    res.status(200).send(data);
  } catch (err) {
    console.log("some error : ", err);
    res.status(500).send("inter web error on fetch");
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
