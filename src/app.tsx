import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { StrictMode } from "react";
import routes from "./app/routes";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";

export const App: React.FC = () => {
  const queryClient = new QueryClient();
  const router = createBrowserRouter(routes);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <Toaster position="top-right" />
      </QueryClientProvider>
    </StrictMode>
  );
};
