import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../users/user.model.js";
import Role from "../roles/role.model.js";
import crypto from "crypto";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";
import AppError from "../../core/errors/AppError.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { comparePassword } from "../../utils/comparePassword.js";
import { verifyRefreshToken } from "../../utils/verifyToken.js";
import Plan from "../plans/plan.model.js";
import { config } from "../../config/env.js";
import { sendEmail } from "../../utils/sendEmail.js";

// REGISTER USER
export const registerUser = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  const defaultRole = await Role.findOne({ name: "user" });

  if (!defaultRole) {
    throw new AppError("Default user role not found", 500);
  }

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
    roles: [defaultRole._id],
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
  const user = await User.findOne({ email: data.email }).populate({
    path: "roles",
    populate: {
      path: "permissions",
    },
  });

  if (!user) throw new AppError("Invalid credentials", 401);

  if (!user.isActive) {
    throw new AppError("User is suspended/inactive", 403);
  }

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

// GET ME
export const getMe = async (user) => {
  const cleanUser = user.toObject();
  delete cleanUser.password;
  delete cleanUser.refreshToken;
  return cleanUser;
};

// REFRESH ACCESS TOKEN
export const refreshAccessToken = async (oldRefreshToken) => {
  if (!oldRefreshToken) {
    throw new AppError("No refresh token provided", 401);
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(oldRefreshToken);
  } catch (err) {
    throw new AppError("Invalid refresh token", 403);
  }

  if (!decoded?.id) {
    throw new AppError("Invalid token payload", 403);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // 🚨 CRITICAL CHECK
  if (!user.refreshToken || user.refreshToken !== oldRefreshToken) {
    throw new AppError("Refresh token mismatch", 403);
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

// FORGOT PASSWORD
export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email });
  console.log("USER", user);
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  // 1. Generate raw token
  const resetToken = crypto.randomBytes(32).toString("hex");
  console.log("Reset token", resetToken);

  // 2. Hash token for DB storage
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 3. Save to DB
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; //10 mins
  await user.save();

  // 🔥 RESET LINK
  const resetUrl = `${config.CLIENT_URL}/auth/reset-password/${resetToken}`;
  console.log("Reset Url", resetUrl);
  console.log("BEFORE SEND EMAIL");
  await sendEmail({
    to: user.email,
    subject: "Nova Panel - Password Reset",
    html: `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset.</p>
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>This link will expire in 10 minutes.</p>
    `,
  });
  console.log("EMAIL SENT");

  // 4. Return raw token (to send via email)
  return resetToken;
};

// RESET PASSWORD
export const resetPasswordService = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Invalid or expired reset token", 400);
  }

  // update password
  user.password = await hashPassword(newPassword);

  // clear reset fields
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return true;
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
