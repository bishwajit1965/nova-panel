import PermissionContext from "../contexts/PermissionContext";

const PermissionProvider = ({ children, user }) => {
  const roles = user.roles || [];

  const permissions = roles.flatMap((role) =>
    (role.permissions || []).map((p) => (typeof p === "object" ? p.key : p)),
  );

  const uniquePermissions = [...new Set(permissions)];

  const permissionInfo = {
    uniquePermissions,
  };

  return (
    <PermissionContext.Provider value={permissionInfo}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
