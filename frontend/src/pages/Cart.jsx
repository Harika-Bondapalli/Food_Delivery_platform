import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../api/api"; // ✅ Ensure this exports "http://localhost:5000/api"
import "./Cart.css";

const Cart = ({ cartItems, removeFromCart, clearCart, updateQuantity }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to place order");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({}), // ✅ Backend reads from DB cart
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success("Order placed successfully!");
        clearCart();
        setTimeout(() => navigate("/order-confirmation"), 1500);
      } else {
        toast.error(data.message || "Order failed.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error placing order.");
      console.error("Order error:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <ToastContainer />
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span>₹{item.price} × {item.quantity}</span>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove" onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <h3>Total: ₹{totalPrice}</h3>
          </div>

          <button
            className="order-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
