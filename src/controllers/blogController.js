const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');
const User = require('../models/User');

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const blogData = {
    title,
    content,
    author: req.user._id,
    category,
  };

  if (req.file) {
    blogData.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  }

  const blog = await Blog.create(blogData);

  res.status(201).json(blog);
});

// @desc    Get all blogs for a specific user
// @route   GET /api/blogs/user/:userId
// @access  Private
const getUserBlogs = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const blogs = await Blog.find({ author: userId })
    .populate('author', 'username')
    .select('title content category image author createdAt updatedAt');

  if (blogs.length === 0) {
    res.status(404);
    throw new Error('No blogs found for this user');
  }

  // Convert each blog's image to base64
  const blogsResponse = blogs.map(blog => {
    const blogObj = blog.toObject();
    if (blogObj.image && blogObj.image.data) {
      blogObj.image = {
        data: blogObj.image.data.toString('base64'),
        contentType: blogObj.image.contentType
      };
    }
    return blogObj;
  });

  res.json(blogsResponse);
});

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({})
    .populate('author', 'username')
    .select('title content category image author createdAt updatedAt');

  if (blogs.length === 0) {
    res.status(404);
    throw new Error('No blogs found');
  }

  // Convert each blog's image to base64
  const blogsResponse = blogs.map(blog => {
    const blogObj = blog.toObject();
    if (blogObj.image && blogObj.image.data) {
      blogObj.image = {
        data: blogObj.image.data.toString('base64'),
        contentType: blogObj.image.contentType
      };
    }
    return blogObj;
  });

  res.json(blogsResponse);
});

// @desc    Get a single blog post
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('author', 'username')
    .select('title content category image author createdAt updatedAt');
  
  if (blog) {
    //convert the image buffer to base64 for easier frontend handling
    const blogResponse = blog.toObject();
    if (blog.image && blog.image.data) {
      blogResponse.image = {
        data: blog.image.data.toString('base64'),
        contentType: blog.image.contentType
      };
    }
    res.json(blogResponse);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    if (blog.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('You do not have permission to update this blog');
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    if (blog.author.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(403);
      throw new Error('You do not have permission to delete this blog');
    }

    await blog.remove();
    res.json({ message: 'Blog removed' });
  } else {
    res.status(404);
    throw new Error('Blog not found');
  }
});

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserBlogs,
};
