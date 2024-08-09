// controllers/blogPostController.js
const BlogPost = require("../models/BlogPost");
const mongoose = require("mongoose");

// Create a new blog post
exports.createPost = async (req, res) => {
  const { title, content, author, tags } = req.body;
  try {
    const newPost = new BlogPost({ title, content, author, tags });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all blog posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().populate("author", "name").exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate("author", "name")
      .exec();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post by ID
exports.updatePost = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.title = title;
    post.content = content;
    post.tags = tags;
    post.updatedAt = Date.now();
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog post by ID
exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { author, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      author,
      content,
      createdAt: new Date(),
    };

    blogPost.comments.push(newComment);
    await blogPost.save();

    res.status(201).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment from a blog post
exports.deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(postId) ||
    !mongoose.Types.ObjectId.isValid(commentId)
  ) {
    return res.status(400).json({ message: "Invalid post ID or comment ID" });
  }

  try {
    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentIndex = blogPost.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    blogPost.comments.splice(commentIndex, 1);
    await blogPost.save();

    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a blog post
exports.getComments = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const blogPost = await BlogPost.findById(postId).populate(
      "comments.author",
      "name"
    );
    if (!blogPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(blogPost.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
