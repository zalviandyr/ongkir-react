import Login from "@/auth/login";
import { ProtectedRoute } from "@/auth/protected-route";
import Register from "@/auth/register";
import { Home } from "@/home/home";
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
