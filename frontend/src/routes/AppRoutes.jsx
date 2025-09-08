import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Cart from "../pages/Cart";
import Veg from "../pages/VegMeals";
import NonVeg from "../pages/NonVegMeals";
import Chefs from "../pages/ChefsList";
import MealListPage from "../pages/MealListPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/veg" element={<Veg />} />
      <Route path="/nonveg" element={<NonVeg />} />
      <Route path="/chefs" element={<Chefs />} />
      <Route path="/meals" element={<MealListPage />} />
    </Routes>
  );
}

export default AppRoutes;
