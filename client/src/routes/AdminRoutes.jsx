import AdminLayout from "../layouts/admin/AdminLayout";
import NotFound from "../pages/publicPages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";
import { ROLES } from "../core/auth/auth.constants";
import Dashboard from "../pages/crudComponents/dashboard/Dashboard";
import UploadsManagement from "../pages/crudComponents/uploads/UploadsManagement";
import PlansManagement from "../pages/crudComponents/plans/PlansManagement";
import Settings from "../pages/crudComponents/settings/Settings";
import UserManagement from "../pages/crudComponents/users/UserManagement";

export const adminRoutes = {
  path: "/admin",
  element: (
    <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
      <AdminLayout />
    </ProtectedRoute>
  ),

  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    { path: "users", element: <UserManagement /> },
    { path: "uploads", element: <UploadsManagement /> },
    { path: "plans", element: <PlansManagement /> },
    { path: "settings", element: <Settings /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
