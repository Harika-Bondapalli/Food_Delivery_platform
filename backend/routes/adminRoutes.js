// backend/routes/adminRoutes.js
import express from "express";
import User from "../models/User.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all users (Admin only)
router.get("/users", protectAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update user roles (Admin only)
router.patch("/users/:id", protectAdmin, async (req, res) => {
  try {
    const { isChef, isAdmin } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isChef, isAdmin },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a user (Admin only)
router.delete("/users/:id", protectAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
