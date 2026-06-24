import * as authService from "./auth.service.js";
import { convertToMs } from "../../utils/convertTime.js";
import projectConfig from "../../config/project.config.js";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../../utils/cookieOptions.js";
import { asyncHandler } from "../../core/async/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";

// REGISTER
export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.registerUser(
    req.body,
  );
  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

  return sendResponse(res, 201, "user registered successfully", {
    user,
    accessToken,
  });
});

// LOGIN
export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(
    req.body,
  );

  res.cookie("accessToken", accessToken, accessTokenCookieOptions);

  res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
  return sendResponse(res, 200, "Login is successful.", { user, accessToken });
});

// ME ROUTE(USER FETCHED)
export const me = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user);
  return sendResponse(res, 200, "User data fetched", { user });
});

// REFRESH TOKEN
export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  const data = await authService.refreshAccessToken(token);

  // Set NEW access token cookie
  res.cookie("accessToken", data.accessToken, accessTokenCookieOptions);

  // Rotate refresh token cookie
  res.cookie("refreshToken", data.refreshToken, refreshTokenCookieOptions);

  return sendResponse(res, 200, "Token refreshed successfully.");
});

// FORGOT PASSWORD
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const resetToken = await authService.forgotPasswordService(email);

  return sendResponse(
    res,
    200,
    "Reset link generated successfully. Check email.",
    resetToken, // remove later in production
  );
});

// RESET PASSWORD
export const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  await authService.resetPasswordService(resetToken, password);

  return sendResponse(res, 200, "Password reset is successful.");
});

// LOGOUT
export const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user._id);

  res.clearCookie("accessToken", accessTokenCookieOptions);
  res.clearCookie("refreshToken", refreshTokenCookieOptions);

  return sendResponse(res, 200, "Logged out successfully.");
});
