import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/meals");  // Navigate to the TodaysMeals route
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Home Cooked Meals</h1>
        <p>Delicious food made with love by home chefs.</p>
        <button className="hero-btn" onClick={handleExploreClick}>
          Explore Meals
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
