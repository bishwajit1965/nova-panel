import User from "./user.model.js";
import AppError from "../../core/errors/AppError.js";

// Get me service
export const getMeService = async (userId) => {
  const user = User.findById(userId)
    .select("-password -refreshToken -__v")
    .populate("plan");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

// Get single user by ID
export const getUserByIdService = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new AppError("User not found", 404);
  return user;
};

// Get all users (admin)
export const getAllUsersService = async () => {
  return await User.find().select("name email role createdAt").populate("plan");
};

// Toggle user status
export const toggleUsersStatusService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  user.isActive = !user.isActive;
  await user.save();
  return user;
};

// Update user role
export const updateUserRoleService = async (userId, role) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  user.role = role;
  await user.save();

  return user;
};
