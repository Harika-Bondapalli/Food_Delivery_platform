import express from "express";
import {
  loginChef,
  uploadMenu,
  getChefMeals,
  deleteMeal,
  updateMeal,
} from "../controllers/chefController.js";
import { protectChef } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginChef);
router.post("/upload", protectChef, uploadMenu);
router.get("/meals", protectChef, getChefMeals);
router.delete("/meals/:id", protectChef, deleteMeal);
router.put("/meals/:id", protectChef, updateMeal);

export default router;
