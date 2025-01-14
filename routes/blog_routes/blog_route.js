const express = require("express");
const multer = require("multer");
const { storage } = require("../../utils/cloudinary_setup");
const upload = multer({ storage });
const {
  fetchAllBlogs,
  addBlog,
  updateBlogById,
  deleteBlogById,
  fetchBlogById,
} = require("../../funtions/blog_funtions/blog_functions");
const router = express.Router();

router.get("/blogs", async (req, res) => {
  try {
    const data = await fetchAllBlogs();
    res.status(200).send(data);
  } catch (err) {
    console.log("error : ", err);
    res.status(500).send("failed to fetch blogs");
  }
});
router.post("/add/blog", upload.single("banner"), async (req, res) => {
  const { title, description, author } = req.body;
  const file = req.file;
  try {
    if (!title || !description || !author || !file) {
      return res.status(404).send("all fields are required");
    }
    const data = await addBlog({
      title: title,
      description: description,
      author: author,
      banner:file.path
    });
    res.status(201).send(data);
  } catch (err) {
    console.log("some error occured while adding the blog");
    res.status(500).send("error : ", err);
  }
});
router.post("/update/blog/:id", upload.single("banner"), async (req, res) => {
  const { title, author, description, banner } = req.body;
  const {id} = req.params;
  const file = req.file;
  try {
    if (!id) {
      return res.status(404).send("id is required to update");
    }
    const data = await updateBlogById(id,{
      title: title, 
      description: description,
      banner: file.path,
      author: author,  
    });
    res.status(200).send(data);
  } catch (err) {
    console.log("error while updating the blog");
    res.status(500).send("failed to update");
  }
});
router.delete("/delete/blog/:id", async (req, res) => {
  const {id} = req.params;
  try {
    if (!id) {
      return res.status(404).send("id is required to delete the blog");
    }
    const data = await deleteBlogById(id);
    res.status(200).send(data);
  } catch (err) {
    console.log("failed to delete the blog",err);
    res.status(500).send("failed to delete the blog")
  }
});
router.get("/blog/:id",async(req,res)=>{
    const {id} = req.params;
    try{
if(!id){
    return res.status(404).send("id is required to fetch blog");
}
const data = await fetchBlogById(id);
res.status(200).send(data);
    }catch(err){

    console.log("failed to fetch the blog",err);
    res.status(500).send("failed to fetch the blog")
    }
})
module.exports = router;
