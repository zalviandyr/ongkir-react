import Login from "@/auth/login";
import Register from "@/auth/register";
import { Home } from "@/home/home";
import { RouteObject } from "react-router";

const routes: RouteObject[] = [
  { element: <Home />, path: "/", index: true },
  { element: <Login />, path: "/login" },
  { element: <Register />, path: "/register" },
];

export default routes;
