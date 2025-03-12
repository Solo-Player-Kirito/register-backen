const jobModel = require("../../models/job_models/job_model");
async function addJob({
  name,
  age,
  qualification,
  resume,
  other,
  email,
  phone,
  address,
  experience,
  skills,
}) {
  try {
    const data = jobModel.create({
      name: name,
      age: age,
      qualification: qualification,
      resume: resume,
      other: other,
      email: email,
      phone: phone,
      address: address,
      experience: experience,
      skills: skills,
    });
    if (data.length === 0 || !data) {
      return "failed to apply";
    }
    return data;
  } catch (err) {
    console.log("some error occured : ", err);
    return "failed to apply for job";
  }
}
async function getAllJobs() {
  try {
    const data = await jobModel.find();
    if (!data || data.length === 0) {
      return "no data found";
    }
    return data;
  } catch (err) {
    console.log("some error occured while fething the data : ", err);
  }
}
async function deleteJobByID(id) {
  try {
    const data = jobModel.findById(id);
    if (!data || data.length === 0) {
      return "job not found or invalid id";
    }
    return await jobModel.findByIdAndDelete(id);
  } catch (err) {
    console.log("error while deleting the job : ", err);
    return "error while deleting the job";
  }
}
async function getJobByPhone(phone) {
  try {
    const data = await jobModel.findOne({ phone: phone });
    if (!data || data.length === 0) {
      return "no data found or wrong contact";
    }
    return data;
  } catch (err) {
    console.error("error while fething the blog");
    return "error while fething the blog";
  }
}
module.exports = { addJob, getAllJobs, deleteJobByID, getJobByPhone };
