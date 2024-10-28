const express = require('express');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getUserBlogs,
} = require('../controllers/blogController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, upload.single('image'), createBlog)
  .get(getBlogs);

router.route('/user/:userId')
  .get(protect, getUserBlogs);

router.route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

router.get('/:id/image', asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog && blog.image) {
    res.set('Content-Type', blog.image.contentType);
    res.send(blog.image.data);
  } else {
    res.status(404).send('Image not found');
  }
}));

module.exports = router;
