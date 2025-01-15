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
    console.log("Error:", err);
    res.status(500).send("Failed to fetch blogs");
  }
});
 
router.post("/add/blog", upload.single("banner"), async (req, res) => {
  const {
    title,
    description,
    author,
    bannerAlt,        
    metaTitle,       
    metaDescription,  
    publishTime,      
    category,        
    tages,            
    focusKeywords,    
  } = req.body;
  const file = req.file;

  try {
    if (!title || !description || !author || !file) {
      return res.status(404).send("All required fields are not provided");
    }
 
    const blogData = {
      title,
      description,
      author,
      banner: file.path,
      bannerAlt,
      metaTitle,
      metaDescription,
      publishTime,
      category,
      tages: tages ? (typeof tages === "string" ? tages.split(",").map(tag => tag.trim()) : tages) : undefined,
      focusKeywords: focusKeywords
        ? (typeof focusKeywords === "string"
            ? focusKeywords.split(",").map(word => word.trim())
            : focusKeywords)
        : undefined,
    };

    const data = await addBlog(blogData);
    res.status(201).send(data);
  } catch (err) {
    console.log("Some error occurred while adding the blog:", err);
    res.status(500).send("Error while adding blog");
  }
});
 
router.post("/update/blog/:id", upload.single("banner"), async (req, res) => {
  const {
    title,
    author,
    description,
    bannerAlt,
    metaTitle,
    metaDescription,
    publishTime,
    category,
    tages,
    focusKeywords,
  } = req.body;
  const { id } = req.params;
  const file = req.file;

  try {
    if (!id) {
      return res.status(404).send("ID is required to update");
    }

    const blogUpdates = {
      title,
      author,
      description,
      bannerAlt,
      metaTitle,
      metaDescription,
      publishTime,
      category,
      tages: tages ? (typeof tages === "string" ? tages.split(",").map(tag => tag.trim()) : tages) : undefined,
      focusKeywords: focusKeywords
        ? (typeof focusKeywords === "string"
            ? focusKeywords.split(",").map(word => word.trim())
            : focusKeywords)
        : undefined,
    };
 
    if (file) {
      blogUpdates.banner = file.path;
    }

    const data = await updateBlogById(id, blogUpdates);
    res.status(200).send(data);
  } catch (err) {
    console.log("Error while updating the blog:", err);
    res.status(500).send("Failed to update blog");
  }
});
 
router.delete("/delete/blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("ID is required to delete the blog");
    }
    const data = await deleteBlogById(id);
    res.status(200).send(data);
  } catch (err) {
    console.log("Failed to delete the blog", err);
    res.status(500).send("Failed to delete the blog");
  }
});
 
router.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("ID is required to fetch blog");
    }
    const data = await fetchBlogById(id);
    res.status(200).send(data);
  } catch (err) {
    console.log("Failed to fetch the blog", err);
    res.status(500).send("Failed to fetch the blog");
  }
});

module.exports = router;
