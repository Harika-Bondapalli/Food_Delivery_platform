// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { toast } from "react-toastify";

function Navbar({ cartItemCount }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    setUser(parsedUser);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfileDropdownOpen(false);
    navigate("/login");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedUser = { ...user, photo: reader.result };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success("Profile photo updated!");
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("File too large! Max 2MB allowed.");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">👨‍🍳 HomeCook</div>

      <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/veg" onClick={toggleMenu}>Veg</Link>
        <Link to="/nonveg" onClick={toggleMenu}>Non-Veg</Link>
        <Link to="/chefs" onClick={toggleMenu}>Top Chefs</Link>

        {user?.role === "admin" && (
          <>
            <Link to="/admin-dashboard" onClick={toggleMenu}>Admin Panel</Link>
            <Link to="/admin/users" onClick={toggleMenu}>User Management</Link>
          </>
        )}

        {user?.role === "chef" && (
          <Link to="/chef-dashboard" onClick={toggleMenu}>Chef Panel</Link>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/user-dashboard" onClick={toggleMenu}>Dashboard</Link>
            <Link to="/cart" className="cart-icon" onClick={toggleMenu}>
              🛒 Cart {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" onClick={toggleMenu}>Login</Link>
            <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
          </>
        ) : (
          <div className="profile-menu">
            <img
              src={user.photo }
              alt="Profile"
              className="profile-pic"
              onClick={toggleProfileDropdown}
            />
            {isProfileDropdownOpen && (
              <div className="profile-dropdown">
                <p><strong>{user.name}</strong></p>
                <p>{user.email}</p>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>☰</div>
    </nav>
  );
}

export default Navbar;
