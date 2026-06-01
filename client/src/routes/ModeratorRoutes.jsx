import { ROLES } from "../core/auth/auth.constants";
import ModeratorLayout from "../layouts/moderator/ModeratorLayout";
import Dashboard from "../pages/moderator/dashboard/Dashboard";
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
  ],
};
