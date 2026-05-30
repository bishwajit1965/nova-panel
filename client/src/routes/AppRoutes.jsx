import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./UserRoutes";
import { adminRoutes } from "./AdminRoutes";
import { authRoutes } from "./AuthRoutes";
import { publicRoutes } from "./PublicRoutes";
import { superAdminRoutes } from "./SuperAdminRouts";

export const router = createBrowserRouter([
  authRoutes,
  superAdminRoutes,
  adminRoutes,
  userRoutes,
  publicRoutes,
]);
