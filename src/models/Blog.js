const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: [String],
  image: {
    data: Buffer,
    contentType: String
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
