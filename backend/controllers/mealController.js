// controllers/mealController.js
import Meal from '../models/Meal.js';
import Chef from '../models/Chef.js'; // Ensure Chef model is registered for populate to work

// Add a new meal
export const addMeal = async (req, res) => {
  try {
    const { title, description, price, type, image, date } = req.body;

    // ✅ Log received body and user info (for debug)
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    // Validate required fields
    if (!title || !price || !type || !req.user?._id) {
      return res.status(400).json({
        error: "Missing required fields: title, price, type or chefId"
      });
    }

    const newMeal = await Meal.create({
      title,
      description,
      price,
      type,
      image,
      date,
      chefId: req.user._id,
    });

    res.status(201).json(newMeal);
  } catch (err) {
    console.error("CREATE MEAL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


// Get all meals with populated chef's name
export const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find().populate("chefId", "name");
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update meal by ID
export const updateMeal = async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMeal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.status(200).json(updatedMeal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete meal by ID
export const deleteMeal = async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);

    if (!deletedMeal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
