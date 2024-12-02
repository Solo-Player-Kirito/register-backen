const {
  certModel,
  userModel,
  courseModel,
} = require("../models/training_model");

// we will put the teme of completion and mark the isCompleted as true

async function certificateEnroll({ time, id, isCompleted }) {
  try {
    const user = await userModel.findById(id).populate("courseInfo");

    const certificate = new certModel({
      isCompleted: isCompleted,
      time: time,
      courseInfo: user.courseInfo._id,
      userInfo: user._id,
    });

    const data = await certificate.save();

    return data;
  } catch (err) {
    console.error("some error ocurred while enrolling the certificate", err);
  }
}
async function getCertificates() {
  try {
    const certs = await certModel
      .find()
      .populate("courseInfo")
      .populate("userInfo");
    if (!certs || certs.length === 0) {
      return "no certificates found";
    }
    return certs;
  } catch (err) {
    console.error("some error occured while fetching the courses", err);
  }
}

async function getCertificateByEnrollId(enrollId) {
  try {
    const user = await userModel
      .findOne({ enrollId: enrollId })
      .populate("courseInfo");
    if (!user || user.length === 0) {
      return "no id certificate found";
    }
    const cert = await certModel
      .findOne({
        courseInfo: user.courseInfo._id,
        userInfo: user._id,
      })
      .populate("userInfo")
      .populate("courseInfo");
    return cert;
  } catch (err) {
    console.error("An error occurred while fetching the certificate", err);
    throw err; // Rethrow the error for proper error handling in the caller
  }
}
async function updateCertificate({ id, time, isCompleted }) {
  try {
    // Check if certificate exists
    const cert = await certModel.findById(id); // Use `await` to get the result
    if (!cert) {
      return "Certificate not found";
    }

    // Update the certificate with new data
    const data = await certModel.findByIdAndUpdate(
      id,
      { time, isCompleted },
      { new: true } // Return the updated document
    );

    if (!data) {
      return "Failed to update the certificate";
    }

    return data;
  } catch (err) {
    console.error("Error occurred while updating the certificate:", err);
    throw new Error("Certificate update failed");
  }
}

module.exports = {
  certificateEnroll,
  getCertificates,
  getCertificateByEnrollId,
  updateCertificate,
};
