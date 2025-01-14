const blogModel = require("../../models/blog_models/blog_model");

async function addBlog({ banner, title, description, author }) {
  try {
    const blog = blogModel.create({
      banner: banner,
      description: description,
      author: author,
      title: title,
    });
    if (!blog) {
      return "failed to add blog";
    }
    return blog;
  } catch (err) {
    console.log("some error occured while adding the banner");
    return " blog adding not working";
  }
}
async function fetchAllBlogs() {
  try {
    const blogs = await blogModel.find();
    if (!blogs || blogs.length === 0) {
      return "blogs not found";
    }

    return blogs;
  } catch (err) {
    console.log("failed to fetch blogs");
    return "error while fething the blogs";
  }
}


async function updateBlogById(id,{ author, description, title, banner }) {
  try {
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { author, description, banner, title },
      { new: true }
    );
    if (!blog) {
      return "failed to update or blog not found";
    }
    return blog;
  } catch (err) {
    console.log("error while updating the blog : ", err);
    return "failed to update";
  }
}

async function deleteBlogById(id) {
  try {
   
    const data = await blogModel.findByIdAndDelete(id);
    if (!data || data.length === 0) {
      return "Failed to delete the blog or blog not found";
    }
    return data;

  } catch (err) {

    console.log("some error occured while deleting the blog", err);
    console.error("some error occured while deleting the blog", err);
    return "some error occured while deleting the blog";
  }
}
async function fetchBlogById(id) {
  try{
    const data = await blogModel.findById(id)
    if(!data || data.length === 0){
      return "blog not found"
    }id
    return data;

  }catch(err){
    console.log("some error occured while fetching the blog", err);
    console.error("some error occured while fetching the blog", err);
    return "some error occured while fetching the blog";
  }
}
module.exports = {
  addBlog,
  fetchAllBlogs,
  updateBlogById,
  deleteBlogById,
  fetchBlogById
};
