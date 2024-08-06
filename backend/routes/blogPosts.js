const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPost");

// Create a new blog post
router.post("/", blogPostController.createPost);

// Get all blog posts
router.get("/", blogPostController.getAllPosts);

// Get a single blog post by ID
router.get("/:id", blogPostController.getPostById);

// Update a blog post by ID
router.put("/:id", blogPostController.updatePost);

// Delete a blog post by ID
router.delete("/:id", blogPostController.deletePost);

module.exports = router;
