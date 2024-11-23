const express = require('express');
const router = express.Router();
const Product = require('./models/Product');

// Fetch all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new product
router.post('/', async (req, res) => {
    const { name, price, description, image } = req.body;
  
    const product = new Product({ name, price, description, image });
  
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      console.error("Error saving product:", err);
      res.status(400).json({ message: err.message });
    }
  });
  

// Delete product
router.delete('/:id', async (re, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;