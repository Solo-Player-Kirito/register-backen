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
    const { email, password, userName } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      userName,
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

router.get("/gulli", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Image and Text</title>
      <style>
        body, html {
   
          height: 100%;
          margin: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0f0f0;
          text-align: center;
        }
        img {
          max-width: 100%;
          height: auto;
          margin-bottom: 20px;
          height : 300px;
        }
      </style>
    </head>
    <body>
      <img src="img/kittu.jpg" alt="Sample Image">
      
      <h1> im a cat</h1>
      <p> super cat</p> 
    </body>
    </html>`);
});

// router.get("/Gulli",(req,res=>{

//  res.send(

//  )

// }))
module.exports = router;
