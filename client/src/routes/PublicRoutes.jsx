import PublicLayout from "../layouts/public/PublicLayout";
import AboutPage from "../pages/publicPages/AboutPage";
import ContactPage from "../pages/publicPages/ContactPage";
import HomePage from "../pages/publicPages/HomePage";
import NotFound from "../pages/publicPages/NotFound";
import Terms from "../pages/publicPages/Terms";
import UnauthorizedPage from "../pages/publicPages/UnauthorizedPage";
import MaintenanceGuard from "./MaintenanceGuard";

export const publicRoutes = {
  path: "/",
  element: <MaintenanceGuard />,

  children: [
    {
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
          path: "unauthorized",
          element: <UnauthorizedPage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ],
};
