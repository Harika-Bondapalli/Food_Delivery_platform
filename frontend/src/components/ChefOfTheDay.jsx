import React, { useState, useEffect } from "react";
import "../styles/ChefOfTheDay.css";

const chefs = [
  {
    name: "Chef Priya Singh",
    image: "/images/priya.jpeg",
    bio: "Specializes in North Indian Veg Meals",
    contact: {
      email: "priya.singh@homecook.com",
      phone: "+91 9876543210",
    },
  },
  {
    name: "Chef Arjun Mehta",
    image: "/images/lakshaman.jpeg",
    bio: "Master of Chicken Biryani & Mutton Curry",
    contact: {
      email: "arjun.mehta@homecook.com",
      phone: "+91 9123456789",
    },
  },
  {
    name: "Chef Neha Rawat",
    image: "/images/arti.jpeg",
    bio: "Bakes delicious cakes and snacks",
    contact: {
      email: "neha.rawat@homecook.com",
      phone: "+91 9012345678",
    },
  },
  {
    name: "Chef Neha Rawat",
    image: "/images/anjali.jpeg",
    bio: "Bakes delicious cakes and snacks",
    contact: {
      email: "neha.rawat@homecook.com",
      phone: "+91 9012345678",
    },
  },
];

const ChefOfTheDay = () => {
  const [index, setIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % chefs.length);
      setShowDetails(false); // Reset details on chef change
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const chef = chefs[index];

  return (
    <section className="chef-fullscreen">
      <div className="chef-card">
        <h2 className="chef-title">👨‍🍳 Chef of the Day</h2>
        <img src={chef.image} alt={chef.name} className="chef-image" />
        <div className="chef-info">
          <h3>{chef.name}</h3>
          <p>{chef.bio}</p>
          <button
            className="contact-btn"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Contact Chef"}
          </button>
        </div>

        {showDetails && (
          <div className="chef-contact-details">
            <h4>📞 Contact Details</h4>
            <p><strong>Email:</strong> {chef.contact.email}</p>
            <p><strong>Phone:</strong> {chef.contact.phone}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChefOfTheDay;
