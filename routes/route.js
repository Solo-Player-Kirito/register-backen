const express = require("express");
const router = express.Router();
// Ensure this path is correct
const bcrypt = require("bcryptjs");
const { appMod } = require("../models/appointment");
const { auth } = require("../models/appointment");

router.post("/register", async (req, res) => {
  try {
    const { email, password, userName } = req.body;

    // Check if the user already exists
    const existingUser = await auth.findOne({ email: email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new auth({
      userName,
      email,
      password: hashedPassword,
    });
    await user.save();

    const { password: _, ...withoutpass } = user.toObject();

    // Save the user to the database

    // Respond with the saved user
    res.status(201).json({
      // profileImg: "add image",
      message: "registered sucessfull",
      userName: withoutpass.userName,
      email: withoutpass.email,
      id: withoutpass._id,
    });
    // console.log(req.body);
  } catch (err) {
    // Handle errors
    console.error(err);
    res
      .status(500)
      .json({ message: "Error occured while registration", error: err });
  }
});

// Signin route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email not matching" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "passwordword not matching" });
    }

    // Respond with the user (excluding password)
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      message: "login successfull",
      userName: userWithoutPassword.userName,
      email: userWithoutPassword.email,
      id: userWithoutPassword._id,
      profileImg: userWithoutPassword.profileImg,
      multiImage: userWithoutPassword.multiImg,
      token: (userWithoutPassword.Toekn =
        "you get token in production api, this is stage api"),
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Error signing in", error: err });
  }
});

router.post("/appointment/booking", async (req, res) => {
  try {
    const { name, city, phone, problem } = req.body;
    if (!name && !phone) {
      return res.send({
        msg: "name and phone is required",
      });
    }
    const data = new appMod({
      name,
      city,
      phone,
      problem,
    });
    await data.save();
    res.send({
      msg: "balle balle",
      data: data,
    });
  } catch (err) {
    console.log({ eror: err });
  }
});

router.get("/appointment/see", async (req, res) => {
  const alldData = await appMod.find({});
  res.send({
    allData: alldData,
  });
});

module.exports = router;
