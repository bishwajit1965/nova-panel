import ForgotPassword from "../components/shared/auth/ForgotPassword";
import Login from "../components/shared/auth/Login";
import Register from "../components/shared/auth/Register";
import ResetPassword from "../components/shared/auth/ResetPassword";
import AuthLayout from "../layouts/auth/AuthLayout";
import NotFound from "../pages/publicPages/NotFound";

export const authRoutes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "forgot-password", element: <ForgotPassword /> },
    {
      path: "reset-password/:resetToken",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
