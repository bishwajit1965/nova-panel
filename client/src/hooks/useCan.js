// hooks/useCan.js

import { useAuth } from "./useAuth";

export const useCan = () => {
  const { user } = useAuth();

  const permissions =
    user?.roles?.flatMap(
      (role) =>
        role.permissions?.map((p) => (typeof p === "object" ? p.key : p)) || [],
    ) || [];

  const uniquePermissions = [...new Set(permissions)];

  const can = (permission) =>
    uniquePermissions.includes("*") || uniquePermissions.includes(permission);

  const canAny = (requiredPermissions = []) =>
    requiredPermissions.some((p) => uniquePermissions.includes(p));

  const canAll = (requiredPermissions = []) =>
    requiredPermissions.every((p) => uniquePermissions.includes(p));

  return {
    permissions: uniquePermissions,
    can,
    canAny,
    canAll,
  };
};

/**======================
 * USAGE
 *=======================*/
// can("user.read")

// canAny([
//   "user.read",
//   "user.update",
// ])

// canAll([
//   "user.read",
//   "user.update",
// ])

// Sidebar

// {can("user.read") && (
//   <NavLink to="/admin/users">
//     Users
//   </NavLink>
// )}

// Pages

// if (!can("user.read")) {
//   return <Unauthorized />;
// }
// Buttons

// {can("user.create") && (
//   <Button>Create User</Button>
// )}

// Tables

// {can("user.delete") && (
//   <DeleteButton />
// )}
// API Calls

// Backend still protects:

// router.delete(
//   "/users/:id",
//   authenticate,
//   authorize("user.delete"),
//   deleteUser
// );
