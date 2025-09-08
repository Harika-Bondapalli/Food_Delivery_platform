import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/api";
import "../styles/TodaysMeals.css";

const TodaysMeals = ({ handleAddToCart }) => {
  const [meals, setMeals] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    return !!user;
  };

  useEffect(() => {
    fetch(`${BASE_URL}/meals`)
      .then(res => res.json())
      .then(data => setMeals(data))
      .catch(err => console.error("Failed to fetch meals:", err));
  }, []);

  const handleAdd = (meal) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    handleAddToCart(meal);
  };

  const handleBuyNow = (meal) => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    handleAddToCart(meal);
    navigate("/cart");
  };

  return (
    <section className="meals-section">
      <h2 className="meals-title">Today’s Meals</h2>
      <div className="meals-grid">
        {meals.map((meal, index) => (
          <div className="meal-card" key={index}>
            <img
              src={meal.image}
              alt={meal.title}
              loading="lazy"
              onError={(e) => (e.target.src = "/images/biryani.webp")}
            />
            <div className="meal-info">
              <h3>{meal.title}</h3>
              <p>{meal.description}</p>
              <span className="price">₹{meal.price}</span>
              <div className="meal-buttons">
                <button
                  className="buy-btn"
                  onClick={() => handleAdd(meal)}
                  aria-label={`Add ${meal.title} to cart`}
                >
                  Add to Cart
                </button>
                <button
                  className="buy-btn buy-now"
                  onClick={() => handleBuyNow(meal)}
                  aria-label={`Buy ${meal.title} now`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaysMeals;
