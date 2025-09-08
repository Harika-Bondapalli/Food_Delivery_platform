// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" />;
  }

  try {
    const user = JSON.parse(storedUser);
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }
    return children;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
