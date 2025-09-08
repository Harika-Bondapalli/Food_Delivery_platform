import React from 'react';
import '../styles/MealsListing.css';

const MealsListing = ({ meals, onAddToCart }) => {
  return (
    <div className="meals-listing">
      <h2>Available Meals</h2>
      <div className="meals-grid">
        {meals.map((meal, index) => (
          <div className="meal-card" key={index}>
            <img src={meal.image} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p>{meal.description}</p>
            <p>₹{meal.price}</p>
            <button onClick={() => onAddToCart(meal)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsListing;
