// frontend/src/pages/PlaceOrder.jsx
import React, { useEffect, useState } from "react";

const PlaceOrder = () => {
  const [meals, setMeals] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  useEffect(() => {
    fetch("http://localhost:5000/api/meals")
      .then(res => res.json())
      .then(data => setMeals(data));
  }, []);

  const addToCart = (meal) => {
    const exists = selectedItems.find((item) => item._id === meal._id);
    if (exists) {
      setSelectedItems(selectedItems.map((item) =>
        item._id === meal._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setSelectedItems([...selectedItems, { ...meal, quantity: 1 }]);
    }
  };

  const placeOrder = async () => {
    const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const items = selectedItems.map(item => ({
      meal: item._id,
      quantity: item.quantity
    }));

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        items,
        total,
        deliveryAddress: address,
        paymentMethod: payment,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Order placed successfully!");
      setSelectedItems([]);
    } else {
      alert("Failed to place order: " + data.message);
    }
  };

  return (
    <div>
      <h2>Select Meals</h2>
      {meals.map((meal) => (
        <div key={meal._id}>
          <span>{meal.title} - ₹{meal.price}</span>
          <button onClick={() => addToCart(meal)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      <ul>
        {selectedItems.map((item) => (
          <li key={item._id}>
            {item.title} x {item.quantity} = ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>

      <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Delivery Address" />
      <br />
      <select value={payment} onChange={(e) => setPayment(e.target.value)}>
        <option>Cash on Delivery</option>
        <option>UPI</option>
        <option>Card</option>
      </select>
      <br />
      <button onClick={placeOrder}>Confirm Order</button>
    </div>
  );
};

export default PlaceOrder;
