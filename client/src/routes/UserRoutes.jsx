import UserLayout from "../layouts/user/UserLayout";
import Profile from "../pages/user/profile/Profile";
import MyPlan from "../pages/user/plan/MyPlan";
import MyUploads from "../pages/user/uploads/MyUploads";
import Dashboard from "../pages/user/dashboard/Dashboard";
import Settings from "../pages/user/settings/Settings";
import NotFound from "../pages/publicPages/NotFound";

export const userRoutes = {
  path: "/users",
  element: <UserLayout />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "my-plan",
      element: <MyPlan />,
    },
    {
      path: "my-uploads",
      element: <MyUploads />,
    },
    {
      path: "settings",
      element: <Settings />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
