// controllers/orderController.js

import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Meal from "../models/Meal.js";

// Create a new order from cart
export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.meal");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const total = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.meal.price,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      total,
      deliveryAddress: req.body.deliveryAddress,
      paymentMethod: req.body.paymentMethod,
      status: "Pending",
    });

    await Cart.deleteOne({ user: req.user.id });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders for user
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.meal");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single order by ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.meal");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reorder an existing order
export const reorder = async (req, res) => {
  try {
    const previousOrder = await Order.findById(req.params.orderId);
    if (!previousOrder) {
      return res.status(404).json({ message: "Old order not found" });
    }

    const newOrder = await Order.create({
      user: previousOrder.user,
      items: previousOrder.items,
      total: previousOrder.total,
      deliveryAddress: previousOrder.deliveryAddress,
      paymentMethod: previousOrder.paymentMethod,
      status: "Pending",
    });

    res.status(201).json({ message: "Reordered successfully", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
