import { ROLES } from "../core/auth/auth.constants";
import ModeratorLayout from "../layouts/moderator/ModeratorLayout";
import Dashboard from "../pages/moderator/dashboard/Dashboard";
import Plans from "../pages/moderator/plans/Plans";
import Users from "../pages/moderator/users/Users";
import NotFound from "../pages/publicPages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";

export const moderatorRoutes = {
  path: "/moderator",
  element: (
    <ProtectedRoute
      allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MODERATOR]}
    >
      <ModeratorLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "plans",
      element: <Plans />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
