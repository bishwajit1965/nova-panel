import { ROLES } from "../core/auth/auth.constants";
import SuperAdminLayout from "../layouts/superAdmin/SuperAdminLayout";
import NotFound from "../pages/publicPages/NotFound";
import Dashboard from "../pages/superAdmin/dashboard/Dashboard";
import PermissionsManagement from "../pages/superAdmin/permissions/PermissionsManagement";
import AccessManagement from "../pages/superAdmin/rolePermissionAssignment/AccessManagement";
import RolePermissionControl from "../pages/superAdmin/rolePermissionAssignment/RolePermissionControl";
import RolesManagement from "../pages/superAdmin/roles/RolesManagement";
import Settings from "../pages/superAdmin/settings/Settings";
import ProtectedRoute from "./ProtectedRoutes";
import PlansManagement from "../pages/superAdmin/plans/PlansManagement";
import UserManagement from "../pages/superAdmin/users/UserManagement";
import UploadsManagement from "../pages/superAdmin/uploads/UploadsManagement";

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
    { path: "user-management", element: <UserManagement /> },
    { path: "uploads", element: <UploadsManagement /> },
    { path: "roles", element: <RolesManagement /> },
    { path: "permissions", element: <PermissionsManagement /> },
    {
      path: "roles-permissions-control",
      element: <RolePermissionControl />,
    },
    {
      path: "access-management",
      element: <AccessManagement />,
    },
    { path: "plans-management", element: <PlansManagement /> },
    { path: "settings", element: <Settings /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
