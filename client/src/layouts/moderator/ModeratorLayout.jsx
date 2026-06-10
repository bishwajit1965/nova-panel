import {
  LucideChevronDown,
  LucideChevronRight,
  LucideLogOut,
  LucideSquareMenu,
  LucideX,
} from "lucide-react";
import { useState } from "react";
import {
  NavLink,
  Outlet,
  replace,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { logoutUser } from "../../services/auth.service";
import Swal from "sweetalert2";
import Button from "../../components/ui/Button.jsx";
import { LucideIcon } from "../../components/lib/LucideIcons.js";
import { moderatorSidebarLinks } from "../../routes/ModeratorSidebarLinks.js";

const ModeratorLayout = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const formatPathName = (pathname) => {
    return pathname
      .replace(/-/g, " ") // hyphens → spaces
      .replace(/([a-z])([A-Z])/g, "$1 $2") // insert space before capital letters
      .split(" ") // split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each
      .join(" ");
  };

  let page = formatPathName(location.pathname.trim().split("/").pop());

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { setUser, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await logoutUser();
      if (res.success) {
        setUser(null);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        logout();
        navigate("/auth/login", replace);
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Logout failed.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
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
        className={`fixed lg:static min-h-screen top-0 left-0 lg:z-10 z-50 w-64 ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0  bg-gray-800 text-gray-400`}
      >
        <div className="sticky top-0">
          <div className="border-b border-slate-600 p-4 shadow-sm">
            <div className="flex items-enter gap-2">
              <div className="h-7 w-7 rounded-full flex items-center justify-center bg-emerald-500 text-xl text-white font-bold">
                N
              </div>

              <h1 className="text-xl font-bold">
                Nova Panel{" "}
                <span className="font-bold text-gray-200">LTS</span>{" "}
              </h1>
            </div>
          </div>
          {moderatorSidebarLinks?.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.href}
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

          <div className="absolute bottom-0 left-0 right-0 lg:hidden px-4 py-2">
            {user && (
              <Button
                onClick={handleLogout}
                size="xs"
                variant="danger"
                icon={LucideIcon.LogOut}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative">
        <header className="border-b border-slate-300 bg-gray-200 text-gray-600 shadow-sm p-4">
          {/* <AdminNavbar /> */}

          <div className="flex items-center justify-between">
            <div className="lg:col-span-10 col-span-12">
              <div className="flex items-center justify-between gap-2">
                <a className="lg:text-xl text-normal font-bold m-0" href="/">
                  Nova Panel
                </a>
                <LucideChevronRight size={16} />{" "}
                <span className="text-gray-500 font-bold lg:text-xl">
                  {page === "Dashboard" ? "Home" : page}
                </span>
              </div>
            </div>
            <div className="lg:col-span-2 col-span-12 flex items-center justify-end z-50">
              {/* RIGHT */}
              <div className="relative items-center gap-3 hidden lg:flex">
                {/* USER */}
                {user ? (
                  <>
                    <button
                      onClick={() => setOpen(!open)}
                      className="flex items-center gap-2 bg-gray-800s px-2 rounded cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-xl text-white font-bold">
                        {user?.name?.charAt(0)}
                      </div>

                      <span className="text-sm">{user?.name}</span>

                      <LucideChevronDown size={16} />
                    </button>

                    {/* DROPDOWN */}
                    {open && (
                      <div className="absolute right-0 top-12 w-52 bg-white text-black rounded shadow z-50">
                        <div className="px-3 py-2 border-b border-gray-300">
                          <p className="font-semibold text-sm">{user?.name}</p>
                          <p className="font-semibold text-sm capitalize">
                            {user?.roles?.map((r) => r.name).join(" • ")}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>

                        <button
                          onClick={handleLogout}
                          disabled={loading}
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                        >
                          <LucideLogOut size={16} />
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/auth/login")}
                    className="text-sm cursor-pointer"
                  >
                    Login
                  </button>
                )}
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
        <div className="p-4 max-h-[calc(100vh-100px)] overflow-y-auto text-base-content/80">
          {<Outlet />}
        </div>

        {/* Footer */}
        <footer className="absolute left-0 right-0 bottom-0 bg-gray-200 text-gray-600 p-2 text-center border-t border-slate-300">
          &copy; {new Date().getFullYear()} Nova Panel. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default ModeratorLayout;
