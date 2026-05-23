import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import projectConfig from "../config/project.config.js";

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: projectConfig.auth.accessTokenExpiry || "15m",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, config.JWT_REFRESH_SECRET, {
    expiresIn: projectConfig.auth.refreshTokenExpiry || "7d",
  });
};
