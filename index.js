// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// // const bcrypt = require('bcryptjs');

// DB =
//   "mongodb+srv://sonusonu60019:register@register1.a0n2ah3.mongodb.net/?retryWrites=true&w=majority&appName=register1";
// const port = 3030 || ProcessingInstruction.env.port;
// // db connected
// // mongoose.connect(DB).then(console.log("db connected")).catch()
// mongoose
//   .connect(DB)
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Database connection error:", err));

// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use("/", require("./routes/route"));
// app.listen(port, () => {
//   console.log("Server running on port : " + port);
// });

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const DB = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

mongoose
  .connect(DB)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes/route"));

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
