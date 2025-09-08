// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Veg from "./pages/Veg";
import NonVegMeals from "./pages/NonVegMeals";
import TopChefs from "./pages/TopChefs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TodaysMeals from "./components/TodaysMeals";
import Cart from "./pages/Cart";
import ChefDashboard from "./pages/ChefDashboard";
import OrderConfirmation from "./pages/OrderConfirmation";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserManagement from "./pages/AdminUserManagement";
import UserDashboard from "./pages/UserDashboard";
import PlaceOrder from "./pages/PlaceOrder";
import TrackOrder from "./pages/TrackOrder";
import OrderHistory from "./pages/OrderHistory";

// Redux actions
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "./redux/cartSlice";

import "./App.css";

function App() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  // Cart actions
  const handleAddToCart = (meal) => {
    dispatch(addToCart(meal));
    toast.success(`${meal.title} added to cart!`);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    toast.info("Item removed from cart.");
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
      toast.warn("Cart cleared!");
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <ErrorBoundary>
        <Navbar cartItemCount={cartItemCount} />
      </ErrorBoundary>

      <main className="main-content">
        <Routes>
          {/* Public Pages */}
          <Route
            path="/"
            element={<Home user={user} handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="/veg"
            element={<Veg handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="/nonveg"
            element={<NonVegMeals handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="/meals"
            element={<TodaysMeals handleAddToCart={handleAddToCart} />}
          />
          <Route path="/chefs" element={<TopChefs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Chef Dashboard */}
          <Route path="/chef-dashboard" element={<ChefDashboard />} />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUserManagement />
              </ProtectedRoute>
            }
          />

          {/* User Dashboard with Home + Orders */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard handleAddToCart={handleAddToCart} />
              </ProtectedRoute>
            }
          />

          {/* Cart & Order Flow */}
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cart}
                removeFromCart={handleRemoveFromCart}
                clearCart={handleClearCart}
                updateQuantity={handleUpdateQuantity}
              />
            }
          />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route
            path="/place-order"
            element={
              <PlaceOrder
                cartItems={cart}
                userId={user?._id}
                clearCart={() => dispatch(clearCart())}
              />
            }
          />
          <Route path="/track-order/:orderId" element={<TrackOrder />} />
          <Route
            path="/order-history"
            element={<OrderHistory userId={user?._id} />}
          />
        </Routes>
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
