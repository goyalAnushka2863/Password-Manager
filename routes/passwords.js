const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Password = require('../models/Password');

router.get('/', auth, async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.userId });
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { website, username, password } = req.body;
    
    const newPassword = new Password({
      user: req.user.userId,
      website,
      username,
      password
    });

    await newPassword.save();
    res.status(201).json(newPassword);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const password = await Password.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!password) {
      return res.status(404).json({ error: 'Password not found' });
    }

    res.json({ message: 'Password deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
