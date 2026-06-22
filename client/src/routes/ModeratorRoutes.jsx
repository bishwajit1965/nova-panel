import { ROLES } from "../core/auth/auth.constants";
import ModeratorLayout from "../layouts/moderator/ModeratorLayout";
import Dashboard from "../pages/crudComponents/dashboard/Dashboard";
import PlansManagement from "../pages/crudComponents/plans/PlansManagement";
import UploadsManagement from "../pages/crudComponents/uploads/UploadsManagement";
import UserManagement from "../pages/crudComponents/users/UserManagement";
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
      element: <UserManagement />,
    },
    {
      path: "plans",
      element: <PlansManagement />,
    },
    {
      path: "uploads",
      element: <UploadsManagement />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
