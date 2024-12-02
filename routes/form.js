const express = require("express");
const router = express.Router();

const formModel = require("../models/form_model");

router.post("/form/input", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name && !phone) {
      return res.send("name and phone is required");
    }
    normaldate = new Date();
    const user = new formModel({
      name,
      email,
      phone,
      message,
      submitDate: new Date().toLocaleDateString(),
    });
    const mydata = await user.save();
    res.send({ msg: "data saved", mydata });
  } catch (err) {
    console.log(err);
    res.send({ msg: "some error occured while adding form", err });
  }
});

router.get("/see/forms", async (req, res) => {
  try {
    const user = await formModel.find();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ msg: "some error occured while fetching ", err });
  }
});

router.delete("/delete/form", async (req, res) => {
  try {
    const { id } = req.body;

    const form = await formModel.findById(id);

    if (!form) {
      return res.send("not find  the id");
    }
    await formModel.findByIdAndDelete(id);
    res.send("sucess deleted");
  } catch (err) {
    res
      .status(500)
      .send({ msg: "some error occured while deleting the form", err });
  }
});

module.exports = router;
