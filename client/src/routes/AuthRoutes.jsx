import Login from "../components/shared/auth/Login";
import Register from "../components/shared/auth/Register";
import AuthLayout from "../layouts/auth/AuthLayout";
import NotFound from "../pages/publicPages/NotFound";
import ResetPassword from "../pages/publicPages/ResetPassword";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "reset-password", element: <ResetPassword /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
