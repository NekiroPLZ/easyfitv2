import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
function ProtectedRoutes({ children }) {
  const { user } = useAuth();

  if (user === null) return <Navigate to="/Login" />;

  return <div>{children}</div>;
}

export default ProtectedRoutes;
