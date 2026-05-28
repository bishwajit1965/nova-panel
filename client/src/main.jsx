import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import "./index.css";
import ThemeProvider from "./providers/ThemeProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
