import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import AppError from "../core/errors/AppError.js";

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET);
  } catch {
    throw new AppError("Invalid refresh token", 403);
  }
};
