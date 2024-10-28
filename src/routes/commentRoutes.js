const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

router.route('/')
  .post(protect, createComment)
  .get(getComments);

router.route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = router;
