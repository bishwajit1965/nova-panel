import { ROLES } from "../core/auth/auth.constants";
import SuperAdminLayout from "../layouts/superAdmin/SuperAdminLayout";
import NotFound from "../pages/publicPages/NotFound";
import Dashboard from "../pages/superAdmin/dashboard/Dashboard";
import Plans from "../pages/superAdmin/plans/Plans";
import RolesManagement from "../pages/superAdmin/roles/RolesManagement";
import Settings from "../pages/superAdmin/settings/Settings";
import Uploads from "../pages/superAdmin/uploads/Uploads";
import Users from "../pages/superAdmin/users/Users";
import ProtectedRoute from "./ProtectedRoutes";

export const superAdminRoutes = {
  path: "/superAdmin",
  element: (
    <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
      <SuperAdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    { path: "users", element: <Users /> },
    { path: "uploads", element: <Uploads /> },
    { path: "roles", element: <RolesManagement /> },
    { path: "plans", element: <Plans /> },
    { path: "settings", element: <Settings /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
