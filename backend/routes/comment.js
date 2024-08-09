const express = require("express");
const router = express.Router();
const commentController = require("../controllers/blogPost");

// Route to add a comment to a blog post
router.post("/:postId/comments", commentController.addComment);

// Route to delete a comment from a blog post
router.delete("/:postId/comments/:commentId", commentController.deleteComment);

// Route to get all comments for a blog post
router.get("/:postId/comments", commentController.getComments);

module.exports = router;
