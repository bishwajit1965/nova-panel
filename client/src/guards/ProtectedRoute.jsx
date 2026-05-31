import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requiredPermissions = [],
  requiredFeatures = [],
  superAdminOnly = false,
  deniedMessage,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ⏳ wait for AuthProvider to finish initial check
  if (loading) return <Loader />;

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // -------------------------
  // ROLE NORMALIZATION
  // -------------------------
  const userRoles = (user.roles || [])
    .map((r) => (typeof r === "string" ? r : r?.name))
    .filter(Boolean)
    .map((r) => r.toLowerCase());

  const isSuperAdmin = userRoles.includes("superadmin");

  const isAdmin = isSuperAdmin || userRoles.includes("admin");

  // -------------------------
  // SUPER ADMIN ONLY ROUTE
  // -------------------------
  if (superAdminOnly && !isSuperAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  const allowedRolesLower = allowedRoles.map((r) => r.toLowerCase());

  // -------------------------
  // PERMISSIONS
  // -------------------------
  const userPermissions =
    user.roles?.flatMap((r) => r.permissions?.map((p) => p.key)) || [];

  // -------------------------
  // FEATURES
  // -------------------------
  const userFeatures = user.plan?.features?.map((f) => f.key) || [];

  // -------------------------
  // ACCESS CHECKS
  // -------------------------
  const hasRoleAccess =
    isAdmin ||
    allowedRolesLower.length === 0 ||
    allowedRolesLower.some((r) => userRoles.includes(r));

  const hasPermissionAccess =
    isAdmin ||
    requiredPermissions.length === 0 ||
    requiredPermissions.every((p) => userPermissions.includes(p));

  const hasFeatureAccess =
    isAdmin ||
    requiredFeatures.length === 0 ||
    requiredFeatures.every((f) => userFeatures.includes(f));

  // ❌ denied
  if (!hasRoleAccess || !hasPermissionAccess || !hasFeatureAccess) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{
          deniedMessage: deniedMessage || "Access is denied.",
        }}
      />
    );
  }

  // ✅ allowed
  return children;
};

export default ProtectedRoute;
