import { Outlet } from "react-router-dom";
import UsersNavbar from "./UsersNavbar";
import Footer from "../../components/shared/footer/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Navbar */}
      <header className="">
        <UsersNavbar />
      </header>

      {/* Outlet */}
      <main className="flex-1 lg:py-8 py-4 px-4 lg:max-w-7xl lg:mx-auto text-base-content/70">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
