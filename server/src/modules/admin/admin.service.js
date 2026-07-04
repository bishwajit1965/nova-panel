import AppError from "../../core/errors/AppError.js";
import User from "../users/user.model.js";

// Get me service
export const getMeService = async (userId) => {
  const user = await User.findById(userId)
    .select("-password -refreshToken -__v")
    .populate("plan");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Get single user by ID
export const getAdminByIdService = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new AppError("User not found", 404);
  return user;
};

// Get all users (admin)
export const getAllAdminsService = async () => {
  return await User.find()
    .select("name email roles createdAt")
    .populate("plan");
};

// Toggle user status
export const toggleAdminStatusService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  user.isActive = !user.isActive;
  await user.save();
  return user;
};

// Update user role
export const updateAdminRoleService = async (userId, role) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  user.roles = roles;
  await user.save();

  return user;
};
