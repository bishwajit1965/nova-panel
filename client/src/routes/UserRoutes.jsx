import UserLayout from "../layouts/user/UserLayout";
import Home from "../pages/user/home/Home";
import Profile from "../pages/user/profile/Profile";
import MyPlan from "../pages/user/plan/MyPlan";
import MyUploads from "../pages/user/uploads/MyUploads";

export const userRoutes = {
  path: "/",
  element: <UserLayout />,
  children: [
    {
      index: true,
      element: <Home />,
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
  ],
};
