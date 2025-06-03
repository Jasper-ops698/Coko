const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  productName: String,
  category: String,
  type: String,
  price: Number,
  quantity: Number,
  date: { type: Date, default: Date.now },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
