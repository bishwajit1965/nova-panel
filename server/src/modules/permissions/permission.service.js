import Permission from "./permission.model.js";
import Role from "../roles/role.model.js";
import AppError from "../../core/errors/AppError.js";

export const createPermissionService = async (payload) => {
  const exists = await Permission.findOne({ key: payload.key });

  if (exists) {
    throw new AppError("Permission already exists", 400);
  }

  return await Permission.create(payload);
};

export const getAllPermissionsService = async () => {
  return await Permission.find().sort({ createdAt: -1 });
};

export const getPermissionByIdService = async (id) => {
  const permission = await Permission.findById(id);

  if (!permission) {
    throw new AppError("Permission not found", 404);
  }

  return permission;
};

export const updatePermissionService = async (id, payload) => {
  const permission = await Permission.findByIdAndUpdate(id, payload, {
    returnDocument: "after",
  });

  if (!permission) {
    throw new AppError("Permission not found", 404);
  }

  return permission;
};

export const deletePermissionService = async (id) => {
  const permission = await Permission.findByIdAndDelete(id);

  if (!permission) {
    throw new AppError("Permission not found", 404);
  }

  return permission;
};
