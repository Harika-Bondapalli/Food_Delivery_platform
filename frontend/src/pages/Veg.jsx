import React, { useEffect, useState } from "react";
import "../styles/Veg.css";

function Veg() {
  const [vegDishes, setVegDishes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/meals")
      .then((res) => res.json())
      .then((data) => {
        const vegItems = data.filter((meal) => meal.type === "veg");
        setVegDishes(vegItems);
      })
      .catch((err) => console.error("Error fetching veg meals:", err));
  }, []);

  return (
    <div className="veg-page">
      <h2 className="veg-title">Vegetarian Meals</h2>
      <p className="veg-subtitle">Enjoy our variety of delicious veg dishes!</p>
      <div className="veg-grid">
        {vegDishes.map((dish) => (
          <div key={dish._id} className="veg-card">
            <img src={dish.image} alt={dish.title} className="veg-img" />
            <h3>{dish.title}</h3>
            <p>{dish.description}</p>
            <p className="veg-price">₹{dish.price}</p>
            <button className="buy-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Veg;
