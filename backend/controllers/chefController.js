import Chef from "../models/Chef.js";
import Meal from "../models/Meal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login Chef
export const loginChef = async (req, res) => {
  try {
    const { email, password } = req.body;
    const chef = await Chef.findOne({ email });

    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    const isMatch = await bcrypt.compare(password, chef.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: chef._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      chef: {
        id: chef._id,
        name: chef.name,
        email: chef.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload Menu
export const uploadMenu = async (req, res) => {
  try {
    const meal = await Meal.create({
      ...req.body,
      chefId: req.user.id,
    });
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Chef Meals
export const getChefMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ chefId: req.user.id });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Meal
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    if (meal.chefId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await meal.remove();
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Meal
export const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    if (meal.chefId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
