import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Redirect to login but save the intended location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
