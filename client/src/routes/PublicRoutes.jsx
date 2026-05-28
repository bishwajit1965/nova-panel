import Login from "../components/shared/auth/Login";
import Register from "../components/shared/auth/Register";
import PublicLayout from "../layouts/public/PublicLayout";
import AboutPage from "../pages/publicPages/AboutPage";
import ContactPage from "../pages/publicPages/ContactPage";
import HomePage from "../pages/publicPages/HomePage";
import NotFound from "../pages/publicPages/NotFound";
import Terms from "../pages/publicPages/Terms";

export const publicRoutes = {
  path: "/",
  element: <PublicLayout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "about",
      element: <AboutPage />,
    },
    {
      path: "contact",
      element: <ContactPage />,
    },
    {
      path: "terms",
      element: <Terms />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
