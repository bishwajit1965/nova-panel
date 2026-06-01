import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./UserRoutes";
import { adminRoutes } from "./AdminRoutes";
import { authRoutes } from "./AuthRoutes";
import { publicRoutes } from "./PublicRoutes";
import { superAdminRoutes } from "./SuperAdminRouts";
import { moderatorRoutes } from "./ModeratorRoutes";

export const router = createBrowserRouter([
  authRoutes,
  superAdminRoutes,
  adminRoutes,
  moderatorRoutes,
  userRoutes,
  publicRoutes,
]);
