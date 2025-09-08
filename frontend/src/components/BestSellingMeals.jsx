import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BestSellingMeals.css';

const BestSellingMeals = ({ handleAddToCart }) => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    return !!user; // returns true if user exists
  };

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
    navigate('/cart');
  };

  const meals = [
    {
      title: 'Paneer Butter Masala',
      image: '/images/paneer.jpeg',
      price: 180,
      description: 'Creamy Paneer Butter Masala served with coriander garnish',
      alt: 'Creamy Paneer Butter Masala'
    },
    {
      title: 'Chicken Biryani',
      image: '/images/biryani.webp',
      price: 220,
      description: 'Aromatic Chicken Biryani served with raita',
      alt: 'Aromatic Chicken Biryani'
    },
    {
      title: 'Veg Thali Combo',
      image: '/images/thali.webp',
      price: 150,
      description: 'Full vegetarian thali with rice, roti, dal, and curry',
      alt: 'Veg Thali Combo'
    },
    {
      title: 'Masala Dosa',
      image: '/images/dosa.webp',
      price: 100,
      description: 'Crispy Masala Dosa with chutney and sambar',
      alt: 'Masala Dosa'
    },
    {
      title: 'Chole Bhature',
      image: '/images/chole.webp',
      price: 120,
      description: 'Spicy Chole with fluffy Bhature',
      alt: 'Chole Bhature'
    },
    {
      title: 'Butter Chicken',
      image: '/images/biryani.webp',
      price: 200,
      description: 'Rich Butter Chicken with cream and butter topping',
      alt: 'Butter Chicken'
    },
    {
      title: 'Fried Rice & Manchurian',
      image: '/images/manchurian.webp',
      price: 160,
      description: 'Fried Rice with Manchurian balls in gravy',
      alt: 'Fried Rice & Manchurian'
    },
    {
      title: 'Cheese Pizza',
      image: '/images/pizza.webp',
      price: 180,
      description: 'Cheesy Margherita Pizza fresh from the oven',
      alt: 'Cheese Pizza'
    },
    {
      title: 'Rajma Chawal',
      image: '/images/rajma.webp',
      price: 130,
      description: 'Punjabi-style Rajma with basmati rice',
      alt: 'Rajma Chawal'
    }
  ];

  return (
    <section className="bestselling-section">
      <h2>🔥 Best Selling Meals</h2>
      <div className="meals-container">
        {meals.map((meal, index) => (
          <div key={index} className="meal-card">
            <img src={meal.image} alt={meal.alt} className="meal-img" />
            <h3>{meal.title}</h3>
            <p className="price">₹{meal.price}</p>
            <div className="meal-buttons">
              <button className="buy-btn" onClick={() => handleAdd(meal)}>
                Add to Cart
              </button>
              <button className="buy-btn buy-now" onClick={() => handleBuyNow(meal)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellingMeals;
