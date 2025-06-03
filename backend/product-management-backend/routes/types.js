const express = require('express');
const Type = require('../models/Type');
const router = express.Router();

// Add new type
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Type name is required" });
  }

  const type = new Type({ name });

  try {
    const newType = await type.save();
    res.status(201).json(newType);
  } catch (err) {
    console.error("Error saving type:", err);
    res.status(400).json({ message: err.message });
  }
});

// Get all types
router.get('/', async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
