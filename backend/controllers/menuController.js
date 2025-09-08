const Meal = require("../models/Meal");

// Create a new meal
exports.createMeal = async (req, res) => {
  try {
    const meal = await Meal.create({ ...req.body, chef: req.user.id });
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all meals by this chef
exports.getMyMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ chef: req.user.id });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a meal
exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndUpdate(
      { _id: req.params.id, chef: req.user.id },
      req.body,
      { new: true }
    );
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a meal
exports.deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      chef: req.user.id,
    });
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.json({ message: "Meal deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
