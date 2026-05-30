import AdminLayout from "../layouts/admin/AdminLayout";
import Users from "../pages/admin/users/Users";
import Uploads from "../pages/admin/uploads/Uploads";
import Plan from "../pages/admin/plans/Plan";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Settings from "../pages/admin/settings/Settings";
import NotFound from "../pages/publicPages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";

export const adminRoutes = {
  path: "/admin",
  element: (
    <ProtectedRoute allowedRoles={["superAdmin", "admin"]}>
      <AdminLayout />
    </ProtectedRoute>
  ),

  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    { path: "users", element: <Users /> },
    { path: "uploads", element: <Uploads /> },
    { path: "plans", element: <Plan /> },
    { path: "settings", element: <Settings /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
