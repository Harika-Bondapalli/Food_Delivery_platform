import React, { useEffect, useState } from "react";
import "../styles/NonVeg.css";

function NonVeg() {
  const [nonVegDishes, setNonVegDishes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/meals")
      .then((res) => res.json())
      .then((data) => {
        const nonVegItems = data.filter((meal) => meal.type === "non-veg");
        setNonVegDishes(nonVegItems);
      })
      .catch((err) => console.error("Error fetching non-veg meals:", err));
  }, []);

  return (
    <div className="nonveg-page">
      <h2 className="nonveg-title">Non-Vegetarian Meals</h2>
      <p className="nonveg-subtitle">Delicious meat dishes from top chefs!</p>
      <div className="nonveg-grid">
        {nonVegDishes.map((dish) => (
          <div key={dish._id} className="nonveg-card">
            <img src={dish.image} alt={dish.title} className="nonveg-img" />
            <h3>{dish.title}</h3>
            <p>{dish.description}</p>
            <p className="price">₹{dish.price}</p>
            <button className="buy-btn">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NonVeg;
