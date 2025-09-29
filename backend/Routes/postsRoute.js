const express = require('express');
const Post = require('../Schema/PostSchema');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Create Post
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      user: req.user._id
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Posts
router.get('/', authenticate, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete Post
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deleted = await Post.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;


