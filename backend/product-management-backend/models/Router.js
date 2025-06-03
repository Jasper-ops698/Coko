const express = require("express");
const Sale = require("./models/sale");
const Order = require("./models/order");
const router = express.Router();

router.get("/sales", async (req, res) => {
  try {
    const sales = await Sale.find(); // Fetch all sales data
    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales data:", error.message);
    res.status(500).json({ message: "Error fetching sales data" });
  }
});
// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// Update order status
router.patch("/orders/:id", async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (error) {
    console.error("Error updating order:", error.message);
    res.status(500).json({ message: "Error updating order" });
  }
});

// Add new order
router.post("/orders", async (req, res) => {
  const { customerName, productName, quantity } = req.body;
  try {
    const order = new Order({ customerName, productName, quantity });
    await order.save();
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ message: "Error creating order" });
  }
});

module.exports = router;
