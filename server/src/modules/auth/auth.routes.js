import express from "express";
import {
  login,
  logout,
  me,
  refreshToken,
  register,
} from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginValidation, registerValidation } from "./auth.validation.js";

const router = express.Router();

// Me route for logged in user data
router.get("/me", authMiddleware, me);

// Refresh Token
router.post("/refresh", refreshToken);

// Register User
router.post("/register", validate(registerValidation), register);

// Login User
router.post("/login", validate(loginValidation), login);

// 🔐 Logout route
router.post("/logout", authMiddleware, logout);

export default router;
