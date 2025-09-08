// routes/mealRoutes.js
import express from "express";
import { protectChef } from "../middleware/authMiddleware.js"; // ✅ Add this line
import {
  addMeal,
  getMeals,
  updateMeal,
  deleteMeal
} from "../controllers/mealController.js";
import Meal from "../models/Meal.js";

const router = express.Router();

// Get all meals
router.get("/", getMeals);

// Add new meal
router.post("/", protectChef, addMeal);

// Update meal
router.put("/:id", protectChef, updateMeal);

// Delete meal
router.delete("/:id", protectChef, deleteMeal);

// Optional: Get today's meals
router.get("/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const meals = await Meal.find({ date: today });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
