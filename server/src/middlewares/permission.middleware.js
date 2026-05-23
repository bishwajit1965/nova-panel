import AppError from "../core/errors/AppError.js";

export const requirePermission = (requiredPermissions = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(new AppError("Unauthorized access attempted.", 401));
    }

    const roles = user.roles || [];

    // STEP 1: collect populated permission objects
    const permissions = roles.flatMap((role) => role.permissions || []);

    // STEP 2: extract keys
    const userPermissionKeys = permissions.map((p) => p.key);

    const required = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];

    // STEP 3: match keys
    const hasAccess = required.some((key) => userPermissionKeys.includes(key));

    if (!hasAccess) {
      return next(new AppError("Forbidden: insufficient permission.", 403));
    }

    next();
  };
};
