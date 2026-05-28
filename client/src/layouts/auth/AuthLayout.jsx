import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content/70">
      <main className="lg:px-0 px-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
