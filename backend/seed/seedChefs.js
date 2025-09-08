import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Chef from '../models/Chef.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const seedChefs = async () => {
  await connectDB();

  const chefs = [
    {
      name: "Chef Harika",
      bio: "Expert in North Indian Cuisine with 5+ years of experience.",
      specialty: "North Indian",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Chef Ravi",
      bio: "Passionate about fusion recipes and healthy meals.",
      specialty: "Fusion & Healthy Meals",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Chef Priya",
      bio: "Master in traditional South Indian meals.",
      specialty: "South Indian",
      image: "https://via.placeholder.com/150",
    },
  ];

  try {
    await Chef.deleteMany(); // Optional: clear old data
    const result = await Chef.insertMany(chefs);
    console.log('Chefs seeded successfully');
    console.log('Chef IDs:', result.map(c => ({ name: c.name, id: c._id })));
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedChefs();
