import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
  requiredPermissions = [],
  requiredFeatures = [],
  superAdminOnly = false,
  deniedMessage,
}) => {
  const { user, isAuthenticated, loading, setUser } = useAuth();

  const location = useLocation();

  const [refreshing, setRefreshing] = useState(true);

  // ✅ Always fetch fresh user when entering this route
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const me = await api.get("/auth/me", { withCredentials: true });
        console.log("ME", me);
        setUser(me.data?.data?.user ?? me.data?.user);
      } catch (err) {
        console.log("Failed to refresh user:", err);
      } finally {
        setRefreshing(false);
      }
    };
    fetchLatest();
  }, [setUser]);

  if (loading || refreshing) return <Loader />;

  // ✅ Not authenticated → go to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // ✅ Roles
  // const userRoles = (user.roles || []).map((r) =>
  //   (typeof r === "string" ? r : r.name)?.toLowerCase(),
  // );
  const normalizeRoles = (roles = []) =>
    roles
      .map((r) => (typeof r === "string" ? r : r?.name))
      .filter(Boolean)
      .map((r) => r.toLowerCase());

  const userRoles = normalizeRoles(user?.roles);

  const isSuperAdmin = userRoles.includes("superadmin");

  // ✅ Admin overrides everything
  const isAdmin = userRoles.includes("admin") || isSuperAdmin;

  // ✅ Super admin only route
  if (superAdminOnly && !isSuperAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  const allowedRolesLower = allowedRoles.map((r) => r.toLowerCase());

  // ✅ Permissions
  const userPermissions =
    user.roles?.flatMap((r) => r.permissions?.map((p) => p.key)) || [];

  // ✅ Features (from plan)
  const userFeatures = user.plan?.features?.map((f) => f.key) || [];

  const hasRoleAccess =
    isAdmin ||
    allowedRolesLower.length === 0 ||
    allowedRolesLower.some((role) => userRoles.includes(role));

  const hasPermissionAccess =
    isAdmin ||
    requiredPermissions.length === 0 ||
    requiredPermissions.every((perm) => userPermissions.includes(perm));

  const hasFeatureAccess =
    isAdmin ||
    requiredFeatures.length === 0 ||
    requiredFeatures.every((feat) => userFeatures.includes(feat));

  if (!hasRoleAccess || !hasPermissionAccess || !hasFeatureAccess) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ deniedMessage: deniedMessage || "Access is denied." }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
