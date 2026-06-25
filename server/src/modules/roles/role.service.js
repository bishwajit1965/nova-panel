import Role from "./role.model.js";
import AppError from "../../core/errors/AppError.js";
import User from "../users/user.model.js";

/**
 * CREATE ROLE
 */
export const createRoleService = async (payload) => {
  const existingRole = await Role.findOne({ slug: payload.slug });

  if (existingRole) {
    throw new AppError("Role already exists", 400);
  }

  return await Role.create(payload);
};

/**
 * GET ALL ROLES
 */
export const getAllRolesService = async () => {
  const roles = await Role.find()
    .populate("permissions")
    .sort({ createdAt: -1 });
  return roles;
};

/**
 * GET ROLE BY ID
 */
export const getRoleByIdService = async (id) => {
  const role = await Role.findById(id);

  if (!role) {
    throw new AppError("Role not found", 404);
  }

  return role;
};

/**
 * UPDATE ROLE
 */
export const updateRoleService = async (id, payload) => {
  const role = await Role.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!role) {
    throw new AppError("Role not found", 404);
  }

  return role;
};

/**
 * ASSIGN ROLE TO USER
 */
export const assignRolesToUserService = async (id, roles) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (!Array.isArray(roles)) {
    throw new AppError("Roles must be an array", 400);
  }
  // user.roles = roles;
  user.roles = [...new Set([...user.roles, ...roles])];

  await user.save();

  return user;
};

export const assignPermissionToRolesService = async (id, permissions) => {
  const role = await Role.findById(id);
  if (!role) {
    throw new AppError("Role not found", 404);
  }

  role.permissions = permissions;
  await role.save();
  return role;
};

/**
 * DELETE ROLE
 */
export const deleteRoleService = async (id) => {
  const role = await Role.findByIdAndDelete(id);

  if (!role) {
    throw new AppError("Role not found", 404);
  }

  return role;
};
