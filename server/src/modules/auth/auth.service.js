import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../users/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";
import AppError from "../../core/errors/AppError.js";
import { config } from "../../config/env.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { comparePassword } from "../../utils/comparePassword.js";
import { verifyRefreshToken } from "../../utils/verifyToken.js";
import Plan from "../plans/plan.model.js";

// REGISTER USER
export const registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const defaultPlan = await Plan.findOne({ isDefault: true, isActive: true });

  if (!defaultPlan) {
    throw new AppError("Default plan not configured", 500);
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    ...data,
    plan: defaultPlan._id,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  // For preventing sensitive data leak
  const cleanUser = user.toObject();
  delete cleanUser.password;
  delete cleanUser.refreshToken;

  return { user: cleanUser, accessToken, refreshToken };
};

// LOGIN USER
export const loginUser = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) throw new AppError("Invalid credentials", 401);

  const isMatch = await comparePassword(data.password, user.password);

  if (!isMatch) throw new AppError("Invalid credentials", 401);

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;

  await user.save();

  // For preventing sensitive data leak
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return {
    user: userObj,
    accessToken,
    refreshToken,
  };
};

export const getMe = async (user) => {
  const cleanUser = user.toObject();
  delete cleanUser.password;
  delete cleanUser.refreshToken;
  return cleanUser;
};

export const refreshAccessToken = async (oldRefreshToken) => {
  if (!oldRefreshToken) {
    throw new AppError("No refresh token provided", 401);
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(oldRefreshToken);
  } catch {
    throw new AppError("Invalid refresh token", 403);
  }

  const user = await User.findById(decoded.id);

  if (!user || user.refreshToken !== oldRefreshToken) {
    throw new AppError("Refresh token reuse detected", 403);
  }

  // generate new tokens
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  // rotate refresh token
  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

// LOGOUT USER
export const logoutUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }
  // 🔥 Invalidate refresh token
  user.refreshToken = null;
  await user.save();

  return true;
};
