import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-gray-200 text-gray-600 p-4">
        <h1 className="text-xl font-bold">Nova Panel User Navbar</h1>
      </header>

      {/* Outlet */}
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 p-4 mt-4 text-center">
        &copy; {new Date().getFullYear()} Nova Panel. All rights reserved.
      </footer>
    </div>
  );
};

export default UserLayout;
