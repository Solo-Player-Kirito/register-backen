const blogModel = require("../../models/blog_models/blog_model");

// Create a new blog post with extended fields
async function addBlog({
  banner,
  bannerAlt,
  title,
  metaTitle,
  description,
  metaDescription,
  publishTime, // optional: if not provided, default in schema (Date.now) will be used
  author,
  category,
  tages,
  focusKeywords,
}) {
  try {
    const blog = await blogModel.create({
      banner,
      bannerAlt,
      title,
      metaTitle,
      description,
      metaDescription,
      publishTime,
      author,
      category,
      tages,
      focusKeywords,
    });
    if (!blog) {
      return "failed to add blog";
    }
    return blog;
  } catch (err) {
    console.log("Some error occurred while adding the blog:", err);
    return "blog adding not working";
  }
}

// Fetch all blog posts
async function fetchAllBlogs() {
  try {
    const blogs = await blogModel.find();
    if (!blogs || blogs.length === 0) {
      return "blogs not found";
    }
    return blogs;
  } catch (err) {
    console.log("Failed to fetch blogs:", err);
    return "error while fetching the blogs";
  }
}

// Update a blog post by ID with extended fields support
async function updateBlogById(
  id,
  {
    banner,
    bannerAlt,
    title,
    metaTitle,
    description,
    metaDescription,
    publishTime,
    author,
    category,
    tages,
    focusKeywords,
  }
) {
  try {
    const blog = await blogModel.findByIdAndUpdate(
      id,
      {
        banner,
        bannerAlt,
        title,
        metaTitle,
        description,
        metaDescription,
        publishTime,
        author,
        category,
        tages,
        focusKeywords,
      },
      { new: true }
    );
    if (!blog) {
      return "failed to update or blog not found";
    }
    return blog;
  } catch (err) {
    console.log("Error while updating the blog:", err);
    return "failed to update";
  }
}

// Delete a blog post by ID
async function deleteBlogById(id) {
  try {
    const data = await blogModel.findByIdAndDelete(id);
    if (!data) {
      return "Failed to delete the blog or blog not found";
    }
    return data;
  } catch (err) {
    console.log("Some error occurred while deleting the blog:", err);
    return "some error occurred while deleting the blog";
  }
}

// Fetch a single blog post by ID
async function fetchBlogById(id) {
  try {
    const data = await blogModel.findById(id);
    if (!data) {
      return "blog not found";
    }
    return data;
  } catch (err) {
    console.log("Some error occurred while fetching the blog:", err);
    return "some error occurred while fetching the blog";
  }
}

module.exports = {
  addBlog,
  fetchAllBlogs,
  updateBlogById,
  deleteBlogById,
  fetchBlogById,
};
