# Blog API Documentation

This document provides an overview of the API endpoints for managing blog posts using the new blog schema. All endpoints utilize the base URL defined by the environment variable NEXT_PUBLIC_FORM_URL (e.g., http://localhost:3000). Adjust the URL as necessary for your deployment.

---

## New Blog Schema

The blog schema contains the following fields:

| Field           | Type               | Description                                            |
| --------------- | ------------------ | ------------------------------------------------------ |
| banner          | String             | URL of the blog banner image.                          |
| bannerAlt       | String             | Alternative text for the banner image.                 |
| title           | String             | The blog title.                                        |
| metaTitle       | String             | The meta title for SEO purposes.                       |
| description     | String             | The blog description (supports rich text).             |
| metaDescription | String             | The meta description for SEO purposes.                 |
| publishTime     | Date (default now) | Publication time (defaults to the current date/time).  |
| author          | String             | Name of the blog author.                               |
| category        | String             | The blog category (e.g., Technology, Lifestyle, etc.). |
| tages           | Array of Strings   | A list of tags.                                        |
| focusKeywords   | Array of Strings   | A list of focus keywords for the blog.                 |

---

## API Endpoints

### 1. Fetch All Blogs

Endpoint:  
 GET /blogs/blogs

Description:  
 Retrieves a list of all blog posts.

Expected Response: (HTTP Status 200)
[
{
"\_id": "60f7a7ae22f3b01234567890",
"banner": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
"bannerAlt": "Sample Banner",
"title": "My First Blog",
"metaTitle": "My First Blog - Meta",
"description": "<p>This is a sample blog description.</p>",
"metaDescription": "This blog is about sample topics.",
"publishTime": "2023-10-10T10:00:00.000Z",
"author": "John Doe",
"category": "Technology",
"tages": ["tech", "news"],
"focusKeywords": ["javascript", "nodejs"],
"createdAt": "2023-10-10T10:00:00.000Z",
"updatedAt": "2023-10-10T10:00:00.000Z"
},
{ ... }
]

---

### 2. Fetch Single Blog by ID

Endpoint:  
 GET blogs//blog/:id

Description:  
 Retrieves a single blog post identified by its unique ID.

Expected Response: (HTTP Status 200)
{
"\_id": "60f7a7ae22f3b01234567890",
"banner": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
"bannerAlt": "Sample Banner",
"title": "My First Blog",
"metaTitle": "My First Blog - Meta",
"description": "<p>This is a sample blog description.</p>",
"metaDescription": "This blog is about sample topics.",
"publishTime": "2023-10-10T10:00:00.000Z",
"author": "John Doe",
"category": "Technology",
"tages": ["tech", "news"],
"focusKeywords": ["javascript", "nodejs"]
}

---

### 3. Add a New Blog

Endpoint:  
 POST blogs//add/blog

Description:  
 Creates a new blog post.  
 Content Type: multipart/form-data  
 (Accepts a file for the "banner" as well as text fields for other properties.)

Required Fields:

| Field           | Type   | Description                                                                            |
| --------------- | ------ | -------------------------------------------------------------------------------------- |
| banner          | File   | Blog banner image file.                                                                |
| bannerAlt       | String | Alternative text for the banner.                                                       |
| title           | String | Blog title.                                                                            |
| metaTitle       | String | Meta title for SEO.                                                                    |
| description     | String | Blog description (rich text supported).                                                |
| metaDescription | String | Meta description for SEO.                                                              |
| author          | String | Author name.                                                                           |
| category        | String | Blog category (e.g., Technology).                                                      |
| tages           | String | Comma-separated list of tags (will be converted to an array on the backend).           |
| focusKeywords   | String | Comma-separated list of focus keywords (will be converted to an array on the backend). |

Expected Response: (HTTP Status 201)
{
"\_id": "60f7a7ae22f3b01234567890",
"banner": "https://res.cloudinary.com/demo/image/upload/banner.jpg",
"bannerAlt": "Sample Banner",
"title": "My First Blog",
"metaTitle": "My First Blog - Meta",
"description": "<p>This is a sample blog description.</p>",
"metaDescription": "This blog is about sample topics.",
"publishTime": "2023-10-10T10:00:00.000Z",
"author": "John Doe",
"category": "Technology",
"tages": ["tech", "news"],
"focusKeywords": ["javascript", "nodejs"],
"createdAt": "2023-10-10T10:00:00.000Z",
"updatedAt": "2023-10-10T10:00:00.000Z"
}

---

### 4. Update a Blog

Endpoint:  
 POST /blogs/update/blog/:id

Description:  
 Updates an existing blog post identified by its ID. If a new banner file is provided, the banner field will be updated accordingly.

Required Fields:  
 Same as in "Add a New Blog" (all fields can be sent via multipart/form-data). Fields not provided will not be updated.

Example Request ():

Expected Response: (HTTP Status 200)
{
"\_id": "60f7a7ae22f3b01234567890",
"banner": "https://res.cloudinary.com/demo/image/upload/new-banner.jpg",
"bannerAlt": "Updated Banner Alt",
"title": "Updated Blog Title",
"metaTitle": "Updated Blog Meta Title",
"description": "<p>Updated blog description.</p>",
"metaDescription": "Updated meta description.",
"publishTime": "2023-10-10T10:00:00.000Z",
"author": "Jane Doe",
"category": "Science",
"tages": ["science", "innovation"],
"focusKeywords": ["research", "technology"],
"createdAt": "2023-10-10T10:00:00.000Z",
"updatedAt": "2023-10-11T08:30:00.000Z"
}

---

### 5. Delete a Blog

Endpoint:  
 DELETE /blogs/delete/blog/:id

Description:  
 Deletes a blog post identified by its ID.

Expected Response: (HTTP Status 200)
{
"message": "Blog deleted successfully",
"deletedBlog": {
"\_id": "60f7a7ae22f3b01234567890",
"title": "Updated Blog Title"
}
}

---
