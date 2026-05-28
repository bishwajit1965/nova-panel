import { convertToMs } from "./convertTime.js";
import projectConfig from "../config/project.config.js";

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: false,
  // secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: convertToMs(projectConfig.auth.refreshTokenExpiry),
};

export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: false,
  // secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: convertToMs(projectConfig.auth.accessTokenExpiry),
};
