import express from "express";
import { registerChef, loginChef } from "../controllers/chefAuthController.js";

const router = express.Router();

router.post("/register", registerChef);
router.post("/login", loginChef);

export default router;
