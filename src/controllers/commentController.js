const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

// @desc    Create a new comment
// @route   POST /api/blogs/:blogId/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const blogId = req.params.blogId;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  const comment = await Comment.create({
    content,
    author: req.user._id,
    blog: blogId,
  });

  // Fetch the created comment with populated author details
  const populatedComment = await Comment.findById(comment._id)
    .populate('author', 'username');

  res.status(201).json(populatedComment);
});

// @desc    Get all comments for a blog
// @route   GET /api/blogs/:blogId/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const blogId = req.params.blogId;

  const comments = await Comment.find({ blog: blogId }).populate('author', 'username');
  res.json(comments);
});

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (comment) {
    if (comment.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('You do not have permission to update this comment');
    }

    comment.content = content || comment.content;

    const updatedComment = await comment.save();
    
    // Fetch the updated comment with populated author details
    const populatedComment = await Comment.findById(updatedComment._id)
      .populate('author', 'username');

    res.json(populatedComment);
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    if (comment.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('You do not have permission to delete this comment');
    }

    // Using deleteOne() instead of remove()
    await Comment.deleteOne({ _id: comment._id });
    // Alternative: await Comment.findByIdAndDelete(comment._id);

    res.json({ message: 'Comment removed' });
  } else {
    res.status(404);
    throw new Error('Comment not found');
  }
});

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
