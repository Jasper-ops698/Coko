const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  serialNumber: String,
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);
