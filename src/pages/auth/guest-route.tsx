import React from "react";
import { useIsAuthenticated } from "@/api/auth";
import { Navigate, Outlet } from "react-router";

export const GuestRoute: React.FC = () => {
  const { data: isAuthenticated, isFetched } = useIsAuthenticated();

  if (isFetched) {
    if (isAuthenticated) {
      return <Navigate to={"/"} replace />;
    }

    return <Outlet />;
  }

  return <></>;
};
