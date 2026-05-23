import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./UserRoutes";
import { adminRoutes } from "./AdminRoutes";

export const router = createBrowserRouter([userRoutes, adminRoutes]);
