import React, { useEffect, useState } from "react";
import BASE_URL from "../api/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserDashboard.css";

// Home page sections
import HeroSection from "../components/HeroSection";
import ChefOfTheDay from "../components/ChefOfTheDay";
import BestSellingMeals from "../components/BestSellingMeals";
import TodaysMeals from "../components/TodaysMeals";

const UserDashboard = ({ handleAddToCart }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (!user || !user.token) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetchOrders();
  }, [user]);

  const formatDate = (str) =>
    new Date(str).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  // ✅ Fix: Calculate pending count
  const pendingCount = orders.filter((order) => order.status === "Pending").length;

  return (
    <div className="dashboard-container">
      <ToastContainer />

      {/* ---------- TABS ---------- */}
      <div className="tabs">
        <button
          className={activeTab === "home" ? "tab active-tab" : "tab"}
          onClick={() => setActiveTab("home")}
        >
          🏠 Home
        </button>
        <button
          className={activeTab === "orders" ? "tab active-tab" : "tab"}
          onClick={() => setActiveTab("orders")}
        >
          📦 My Orders
          {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
        </button>
      </div>

      {/* ---------- HOME SECTION ---------- */}
      {activeTab === "home" && (
        <>
          <section className="section hero-section">
            <HeroSection />
          </section>

          <section className="section chef-section">
            <h2 className="section-title">Chef of the Day</h2>
            <ChefOfTheDay />
          </section>

          <section className="section best-selling-section">
            <h2 className="section-title">Best Selling Meals</h2>
            <BestSellingMeals handleAddToCart={handleAddToCart} />
          </section>

          <section className="section todays-meals-section">
            <h2 className="section-title">Today’s Specials</h2>
            <TodaysMeals handleAddToCart={handleAddToCart} />
          </section>
        </>
      )}

      {/* ---------- ORDER SECTION ---------- */}
      {activeTab === "orders" && (
        <div className="section">
          <h3>📦 Your Orders</h3>
          <div className="order-filter">
            <label>Status: </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Preparing</option>
              <option>Delivered</option>
            </select>
          </div>

          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : filteredOrders.length === 0 ? (
            <p className="no-orders">No orders found.</p>
          ) : (
            <div className="orders-grid">
              {filteredOrders.map((order) => (
                <div key={order._id} className="order-card">
                  <p><strong>ID:</strong> {order._id}</p>
                  <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>

                  <div className="status-tracker">
                    {["Pending", "Confirmed", "Preparing", "Delivered"].map(
                      (step) => (
                        <span
                          key={step}
                          className={`step ${
                            step === order.status ? "active" : ""
                          } ${
                            ["Confirmed", "Preparing", "Delivered"].includes(order.status) &&
                            step !== "Pending" &&
                            ["Pending", "Confirmed", "Preparing"].includes(step)
                              ? "passed"
                              : ""
                          }`}
                        >
                          {step}
                        </span>
                      )
                    )}
                  </div>

                  <ul className="order-items">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        <img
                          src={item.meal?.image}
                          alt={item.meal?.title}
                          className="item-thumb"
                        />
                        {item.meal?.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
