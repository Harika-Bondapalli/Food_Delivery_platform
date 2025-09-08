import React, { useState } from 'react';
import '../styles/ChefDashboard.css';

const ChefDashboard = ({ onMenuUpload }) => {
  const [meal, setMeal] = useState({ name: '', price: '', description: '', image: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (meal.name && meal.price && meal.description && meal.image) {
      onMenuUpload(meal);
      setMeal({ name: '', price: '', description: '', image: '' });
    }
  };

  return (
    <div className="chef-dashboard">
      <h2>Upload Meal to Menu</h2>
      <form onSubmit={handleSubmit} className="menu-form">
        <input name="name" value={meal.name} onChange={handleChange} placeholder="Meal Name" />
        <input name="price" value={meal.price} onChange={handleChange} placeholder="Price" />
        <input name="description" value={meal.description} onChange={handleChange} placeholder="Description" />
        <input name="image" value={meal.image} onChange={handleChange} placeholder="Image URL" />
        <button type="submit">Add Meal</button>
      </form>
    </div>
  );
};

export default ChefDashboard;