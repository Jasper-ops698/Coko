const express = require('express');
const Category = require('../models/Category');
const router = express.Router();

// Add new category
router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const category = new Category({ name });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error saving category:", err);
    res.status(400).json({ message: err.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
