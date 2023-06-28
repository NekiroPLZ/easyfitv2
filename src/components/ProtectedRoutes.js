import React from "react";
import { useAuth } from "../context/AuthContext";
import {  Navigate } from "react-router-dom";
function ProtectedRoutes({ children }) {
  const { user, loading } = useAuth();
  //if (loading) return <h2>loading</h2>;
  if (!user) return <Navigate to="/Login" />;

  return <div>{children}</div>;
}

export default ProtectedRoutes;
