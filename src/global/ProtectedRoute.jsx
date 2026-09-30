import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const token = useSelector(
    (state) => state.staff?.token || state.user?.token,
  );

  if (!token) {
    // Send the user to login, but remember where they were headed
    // so you can redirect back after a successful login if you want.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;