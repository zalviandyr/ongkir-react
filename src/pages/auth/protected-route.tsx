import React, { useEffect } from "react";
import { Navigate } from "react-router";

export const ProtectedRoute: React.FC = () => {
  useEffect(() => {}, []);

  return <Navigate to={"/login"} />;
};
