import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "../../components/shared/footer/Footer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Navbar */}
      <PublicNavbar />

      {/* Outlet */}
      <main className="flex-1 lg:py-8 py-4 px-4 lg:max-w-7xl lg:mx-auto text-base-content/80">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
