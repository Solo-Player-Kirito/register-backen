const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../../utils/cloudinary_setup");
const upload = multer({ storage });
const {
  addJob,
  getAllJobs,
  deleteJobByID,
  getJobByPhone,
} = require("../../funtions/job_funtions/job_funtions");
const jobModel = require("../../models/job_models/job_model");
// const jobModel = require("../../funtions/job_funtions/job_funtions");
router.get("/check", async (req, res) => {
  res.status(201).send("ok");
});
router.post("/add/job",upload.single("resume") ,async (req, res) => {
  const {
    name,
    age,
    qualification,
    other,
    email,
    phone,
    address,
    experience,
    skills,
  } = req.body;
  const resume = req.file;
  try {
    if(!name || !phone || !age){
        return res.status(404).send("all fields are required")
    }
    const data = await addJob({
      name,
      age,
      qualification,
      resume:resume.path,
      other,
      email,
      phone,
      address,
      experience,
      skills,
    });
    res.status(201).send(data);
    // console.log(data);
  } catch (err) {
    res.status(500).send("some error occured while adding");
    console.log("error: ", err);
  }
});
router.get("/jobs", async (req, res) => {
  try {
    const data = await getAllJobs();
    res.status(201).send(data);
  } catch (err) {
    console.log("some error occured while fething the data : ", err);
    res.status(500).send("error while fething the data : ", err);
  }
});
router.delete("/delete/job/:id",async(req,res)=>{
    const {id} = req.params
    try{
        if(!id){
            return res.status(404).send("id is required to delete");
        }
const data = await deleteJobByID(id);
res.status(201).send(data);
    }catch(err){
        console.log("error while deleting the job : ",err);
        res.status(500).send("error while deleting the job : ",err)
    }
})
router.get("/job/:phone",async(req,res)=>{
    const {phone} = req.params;
    try{
        if(!phone){
            return res.status(404).send("contect required to get the data");
        }
        const data = await getJobByPhone(phone);
        res.status(201).send(data);

    }catch(err){

    }
})
module.exports = router;
