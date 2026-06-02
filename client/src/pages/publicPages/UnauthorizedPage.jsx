import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LucideIcon } from "../../components/lib/LucideIcons";
import Button from "../../components/ui/Button";

const UnauthorizedPage = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const deniedMessage = location.state?.deniedMessage;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center">
      <div className="lg:min-w-lg border p-8 bg-base-300 border-base-content/5 rounded-lg shadow-lg hover:shadow-xl space-y-3 text-center text-base-content/70">
        <LucideIcon.AlertCircle
          size={50}
          className="text-red-500 mx-auto mb-4"
        />
        <h1 className="lg:text-3xl text-xl lg:font-extrabold font-bold mb-2">
          Unauthorized to Get Access!
        </h1>

        {user && <p>{user?.name} is unauthorized here.</p>}

        {deniedMessage && (
          <p className="text-lg text-gray-600 mb-6">{deniedMessage}</p>
        )}
        <div className="divider w-9/12 mx-auto"></div>
        <div className="lg:space-x-4 lg:flex items-center justify-center grid gap-2">
          <Button href="/" variant="primary" icon={LucideIcon.Home}>
            Home
          </Button>

          {!isAuthenticated && (
            <Button
              href="/auth/login"
              variant="success"
              icon={LucideIcon.LogIn}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
