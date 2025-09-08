// src/utils/auth.js
export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  return user !== null;
};
