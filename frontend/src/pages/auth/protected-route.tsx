import React from "react";
import { useIsAuthenticated } from "@/api/auth";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute: React.FC = () => {
  const { data: isAuthenticated, isFetched } = useIsAuthenticated();

  if (isFetched) {
    if (isAuthenticated) {
      return <Outlet />;
    }

    return <Navigate to={"/login"} replace />;
  }

  return <></>;
};
