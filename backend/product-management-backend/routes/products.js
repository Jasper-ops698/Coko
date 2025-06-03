const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Add new product
router.post('/', upload.single('image'), async (req, res) => {
  const { name, price, category, type, serialNumber } = req.body;
  const imageUrl = req.file ? req.file.filename : null; // if file is uploaded

  if (!name || !price || !category || !type) {
    return res.status(400).json({ message: "Name, price, category, and type are required" });
  }

  const product = new Product({ name, price, category, type, serialNumber, imageUrl });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
