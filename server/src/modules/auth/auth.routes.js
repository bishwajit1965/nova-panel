import express from "express";
import {
  forgotPassword,
  login,
  logout,
  me,
  refreshToken,
  register,
  resetPassword,
} from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Refresh Token
router.post("/refresh", refreshToken);

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password/:resetToken", resetPassword);

// Me route for logged in user data
router.get("/me", authMiddleware, me);

// 🔐 Logout route
router.post("/logout", authMiddleware, logout);

export default router;
