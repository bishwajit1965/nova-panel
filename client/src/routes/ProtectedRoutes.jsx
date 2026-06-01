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
  const { user, authReady, loading } = useAuth();
  const location = useLocation();

  // 1. WAIT FOR AUTH BOOTSTRAP
  if (loading || !authReady) return <Loader />;

  // 2. NOT LOGGED IN → LOGIN PAGE
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 3. NORMALIZE ROLES
  const userRoles = (user?.roles || [])
    .map((r) => (typeof r === "string" ? r : r?.name))
    .filter(Boolean)
    .map((r) => r.toLowerCase());

  const allowedRolesLower = allowedRoles.map((r) => r.toLowerCase());

  const isSuperAdmin = userRoles.includes("superadmin");

  // SuperAdmin wild card entry
  const hasSuperAdminOverride = isSuperAdmin;

  // 4. SUPER ADMIN ONLY ROUTE
  if (superAdminOnly && !isSuperAdmin) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ deniedMessage: deniedMessage || "Access denied." }}
      />
    );
  }

  // 5. ROLE CHECK (STRICT MATCH ONLY)
  const hasRoleAccess =
    allowedRolesLower.length === 0
      ? true
      : allowedRolesLower.some((role) => userRoles.includes(role));

  // 6. PERMISSION CHECK (STRICT)
  const userPermissions =
    user.roles?.flatMap((r) => r.permissions?.map((p) => p.key)) || [];

  const hasPermissionAccess =
    requiredPermissions.length === 0
      ? true
      : requiredPermissions.every((perm) => userPermissions.includes(perm));

  // 7. FEATURE CHECK (STRICT)
  const userFeatures = user.plan?.features?.map((f) => f.key) || [];

  const hasFeatureAccess =
    requiredFeatures.length === 0
      ? true
      : requiredFeatures.every((feat) => userFeatures.includes(feat));

  // 8. FINAL GATE
  if (
    !hasSuperAdminOverride &&
    (!hasRoleAccess || !hasPermissionAccess || !hasFeatureAccess)
  ) {
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

  return children;
};

export default ProtectedRoute;
