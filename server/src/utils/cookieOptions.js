import { convertToMs } from "./convertTime.js";
import projectConfig from "../config/project.config.js";

export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: convertToMs(projectConfig.auth.refreshTokenExpiry),
};
