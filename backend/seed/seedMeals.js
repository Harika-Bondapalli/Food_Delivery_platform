import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Meal from '../models/Meal.js';
import Chef from '../models/Chef.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const seedMeals = async () => {
  await connectDB();

  try {
    const chefs = await Chef.find();

    if (chefs.length === 0) {
      throw new Error('❗ No chefs found. Please seed chefs first.');
    }

    const meals = [
      {
        title: "Butter Chicken",
        description: "Creamy North Indian delicacy",
        price: 250,
        image: "https://via.placeholder.com/200",
        type: "non-veg",
        date: "2025-07-21",
        chefId: chefs.find(c => c.name === "Chef Anchal")?._id,
      },
      {
        title: "Quinoa Salad",
        description: "Healthy salad with veggies and quinoa",
        price: 180,
        image: "https://via.placeholder.com/200",
        type: "veg",
        date: "2025-07-21",
        chefId: chefs.find(c => c.name === "Chef Ravi")?._id,
      },
      {
        title: "Masala Dosa",
        description: "Crispy dosa filled with spicy potato masala",
        price: 120,
        image: "https://via.placeholder.com/200",
        type: "veg",
        date: "2025-07-21",
        chefId: chefs.find(c => c.name === "Chef Priya")?._id,
      },
    ];

    // Ensure all chefIds are valid
    if (meals.some(meal => !meal.chefId)) {
      throw new Error("❗ One or more chef names in the meals do not exist in the database.");
    }

    await Meal.deleteMany();
    const result = await Meal.insertMany(meals);

    console.log("✅ Meals seeded successfully:");
    result.forEach(m => console.log(`🍽️ ${m.title} by Chef ID: ${m.chefId}`));
    process.exit();
  } catch (err) {
    console.error("❌ Seeding meals failed:", err.message);
    process.exit(1);
  }
};

seedMeals();
