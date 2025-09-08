import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  type: { type: String, enum: ['veg', 'non-veg'], required: true },
chefId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Chef',
  required: true
},
  date: { type: String }, // Format: YYYY-MM-DD
});

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
