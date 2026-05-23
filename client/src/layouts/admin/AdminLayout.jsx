import { LucideSquareMenu, LucideX } from "lucide-react";
import { useState } from "react";
import { sidebarLinks } from "../../routes/sidebarLinks.js";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {/* Mobile overlay */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-100 z-40 lg:hidden"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static lg:min-h-screen top-0 left-0 lg:z-10 z-50 h-full w-64 ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0  bg-gray-800 text-gray-400`}
      >
        <div className="border-b border-slate-600 p-4 shadow-sm">
          <div className="flex items-enter gap-2">
            <div className="h-8 w-8 p-2 rounded-full flex items-center justify-center bg-emerald-500 text-xl text-white font-bold">
              N
            </div>

            <h1 className="text-xl font-bold">
              Nova Panel{" "}
              <span className="font-bold text-gray-200">LTS</span>{" "}
            </h1>
          </div>
        </div>
        {sidebarLinks?.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition ${
                  isActive ? "bg-slate-700 text-white" : "hover:bg-slate-700"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative">
        <header className="border-b border-slate-300 bg-gray-200 text-gray-600 shadow-sm p-4">
          <div className="flex items-center justify-between space-x-">
            <div className="lg:col-span-10 col-span-12">
              <div className="flex items-center justify-between gap-2">
                <a className="lg:text-xl text-normal font-bold m-0" href="#">
                  Dashboard
                </a>
                <a className="lg:text-xl text-normal m-0" href="#">
                  Home
                </a>{" "}
                /{" "}
                <a className="lg:text-xl text-normal m-0" href="#">
                  Dashboard
                </a>{" "}
              </div>
            </div>
            <div className="lg:col-span-2 col-span-12 flex items-center justify-end z-50">
              <div className="hidden lg:flex items-center gap-2">
                <a href="">Dashboard</a>
                <a href="">Home</a>
                <a
                  href="#"
                  className="h-8 w-8 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold"
                >
                  {" "}
                  B
                </a>
              </div>

              <div
                onClick={toggleSidebar}
                className="lg:text-xl text-normal lg:hidden"
              >
                {isSideBarOpen ? (
                  <LucideX className="h-6 w-6 text-base-200" />
                ) : (
                  <LucideSquareMenu className="h-6 w-6 text-base-200s" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Outlet */}
        <div className="p-4">{<Outlet />}</div>

        {/* Footer */}
        <footer className="absolute left-0 right-0 bottom-0 bg-gray-200 text-gray-600 p-2 text-center border-t border-slate-300">
          &copy; {currentYear} Nova Panel. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
