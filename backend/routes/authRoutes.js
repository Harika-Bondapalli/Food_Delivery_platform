import express from "express";
import {
  loginUser,
  registerUser,
  googleLogin
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);

export default router;