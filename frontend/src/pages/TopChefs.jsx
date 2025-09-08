import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TopChefs.css';

function TopChefs() {
  const navigate = useNavigate();

  const chefs = [
    { name: "Chef Priya Sharma", specialty: "North Indian Cuisine", img: "/images/priya.jpeg" },
    { name: "Chef Rajat Verma", specialty: "Non-Veg Delights", img: "/images/chef.jpeg" },
    { name: "Chef Naina Kapoor", specialty: "South Indian Meals", img: "/images/anjali.jpeg" },
    { name: "Chef Ankur Joshi", specialty: "Street Food King", img: "/images/lakshaman.jpeg" },
    { name: "Chef Simran Kaur", specialty: "Baked & Desserts", img: "/images/simran.webp" },
    { name: "Chef Arjun Mehta", specialty: "Fusion & Indo-Chinese", img: "/images/arti.jpeg" },
        { name: "Chef Ankur Joshi", specialty: "Street Food King", img: "/images/lakshaman.jpeg" }
  ];

  const handleViewMeals = (specialty) => {
    if (specialty.toLowerCase().includes("non-veg")) {
      navigate("/nonveg");
    } else {
      navigate("/veg");
    }
  };

  return (
    <div className="top-chefs-container">
      <h1 className="top-chefs-title">Top Rated Home Chefs</h1>
      <p className="top-chefs-subtitle">Meet our most loved chefs and their specialties.</p>
      
      <div className="chefs-grid">
        {chefs.map((chef, index) => (
          <div key={index} className="chef-card">
            <img src={chef.img} alt={chef.name} className="chef-img" />
            <h3>{chef.name}</h3>
            <p className="specialty">{chef.specialty}</p>
            <button
              className="view-meals-btn"
              onClick={() => handleViewMeals(chef.specialty)}
            >
              View Meals
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopChefs;
