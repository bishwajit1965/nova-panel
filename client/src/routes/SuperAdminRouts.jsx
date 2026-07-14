import { ROLES } from "../core/auth/auth.constants";
import SuperAdminLayout from "../layouts/superAdmin/SuperAdminLayout";
import NotFound from "../pages/publicPages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";
import Dashboard from "../pages/crudComponents/dashboard/Dashboard";
import UserManagement from "../pages/crudComponents/users/UserManagement";
import UploadsManagement from "../pages/crudComponents/uploads/UploadsManagement";
import PermissionsManagement from "../pages/crudComponents/permissions/PermissionsManagement";
import RolePermissionControl from "../pages/crudComponents/rolePermissionAssignment/RolePermissionControl";
import AccessManagement from "../pages/crudComponents/rolePermissionAssignment/AccessManagement";
import PlansManagement from "../pages/crudComponents/plans/PlansManagement";
import Settings from "../pages/crudComponents/settings/Settings";
import RolesManagement from "../pages/crudComponents/roles/RolesManagement";
import AuditLogsManagement from "../pages/crudComponents/auditLogs/AuditLogsManagement";
import NotificationManagement from "../pages/crudComponents/notifications/NotificationManagement";
import ProfileManagement from "../pages/crudComponents/profile/ProfileManagement";

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
    { path: "audit-logs", element: <AuditLogsManagement /> },
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
    { path: "notifications", element: <NotificationManagement /> },
    { path: "profile", element: <ProfileManagement /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
