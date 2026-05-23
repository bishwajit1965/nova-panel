import AdminLayout from "../layouts/admin/AdminLayout";
import Users from "../pages/admin/users/Users";
import Uploads from "../pages/admin/uploads/Uploads";
import Plan from "../pages/admin/plans/Plan";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Settings from "../pages/admin/settings/Settings";

export const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "dashboard", element: <Dashboard /> },
    { path: "users", element: <Users /> },
    { path: "uploads", element: <Uploads /> },
    { path: "plans", element: <Plan /> },
    { path: "settings", element: <Settings /> },
  ],
};
