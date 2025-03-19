import Login from "@/pages/auth/login";
import { ProtectedRoute } from "@/pages/auth/protected-route";
import Register from "@/pages/auth/register";
import { Home } from "@/pages/home/home";
import { RouteObject } from "react-router";

const routes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  { element: <Login />, path: "/login" },
  { element: <Register />, path: "/register" },
];

export default routes;
