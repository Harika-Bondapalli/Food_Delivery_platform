// routes/orderRoutes.js

import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  reorder, // ✅ Added this
} from "../controllers/orderController.js";

import Order from "../models/Order.js";
import { verifyToken, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// USER ROUTES
router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrder);
router.post("/reorder/:orderId", verifyToken, reorder); // ✅ Route now works

// Cancel a pending order
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
      status: "Pending",
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found or cannot be cancelled",
      });
    }

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADMIN ROUTES
router.get("/admin/all", protectAdmin, async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate("user", "name email")
      .populate("items.meal", "title price");

    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id/status", protectAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Preparing", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("user", "name")
      .populate("items.meal", "title");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
