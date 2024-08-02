const express = require("express");
const router = express.Router();
const User = require("../models/user.models"); // Ensure this path is correct
const bcrypt = require("bcryptjs");

// Signup route

// router.get("/rc", (req, res) => {
//   res.send("hello rc");
// });
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Respond with the saved user
    res.status(201).json(savedUser);
    // console.log(req.body);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// Signin route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Respond with the user (excluding password)
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json(userWithoutPassword);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Error signing in", error: err });
  }
});

module.exports = router;
