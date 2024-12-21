const express = require("express");
const multer = require("multer");
const { storage } = require("../../utils/cloudinary_setup");

const {
  certificateEnroll,
  getCertificates,
  getCertificateByEnrollId,
  updateCertificate,
} = require("../../funtions/certificate");
const { userModel, courseModel } = require("../../models/training_model");
const router = express.Router();
router.post("/certificate/enrollment", async (req, res) => {
  const { time, isCompleted, id } = req.body;
  //   const id = req.params;
  // this id is user id
  try {
    if (!time || !isCompleted || !id) {
      res.status(404).send("all fields are required");
    }
    const data = await certificateEnroll({
      time,
      isCompleted,
      id,
    });
    res.status(201).send(data);
  } catch (err) {
    console.log("some error occured whwile certificate enrollment", err);
    res
      .status(500)
      .send({ msg: "some error occured whwile certificate enrollment", err });
  }
});
router.get("/certificates", async (req, res) => {
  try {
    const data = await getCertificates();
    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "some error occured while getting the certificates" });
    console.log("err", err);
  }
});

router.get("/certificate/:enrollId", async (req, res) => {
  const { enrollId } = req.params; // Extract enrollId as a string
  try {
    if (!enrollId) {
      return res.status(400).send({ msg: "Enroll ID is required" });
    }
    const data = await getCertificateByEnrollId(enrollId); // Pass the string value
    if (!data) {
      return res.status(404).send({ msg: "Certificate not found" });
    }
    res.send(data);
  } catch (err) {
    console.error("An error occurred while fetching the certificate", err);
    res.status(500).send({ msg: "Failed to fetch certificate", err });
  }
});
router.post("/certificate/update/:id", async (req, res) => {
  const { time, isCompleted } = req.body;
  const { id } = req.params;
  try {
    if (!time || !isCompleted || !id) {
      res.status(201).send("fields are required");
    }

    const data = await updateCertificate({ id, time, isCompleted });
    res.send(data);
  } catch (err) {
    res.send({ msg: "error while updating the certificate", err });
    console.log("error while updating the certificate", err);
  }
});
module.exports = router;
