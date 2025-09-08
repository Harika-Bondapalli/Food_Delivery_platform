import express from "express";
import {
  registerUser,
  loginUser,
  googleLogin,
} from "../controllers/userController.js";
import User from "../models/User.js";
import { verifyToken, protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);

// ✅ Promote a user to admin (Admin only)
router.patch("/make-admin/:id", protectAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: `${user.name} promoted to admin`, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
