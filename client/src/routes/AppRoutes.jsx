import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./UserRoutes";
import { adminRoutes } from "./AdminRoutes";
import { authRoutes } from "./AuthRoutes";
import { publicRoutes } from "./PublicRoutes";

export const router = createBrowserRouter([
  authRoutes,
  userRoutes,
  adminRoutes,
  publicRoutes,
]);
