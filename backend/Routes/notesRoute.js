const express = require('express');
const Note = require('../Schema/NotesSchema');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Create Note
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      user: req.user._id
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Notes
router.get('/', authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete Note
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;


