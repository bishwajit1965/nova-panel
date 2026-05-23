import rateLimit from "express-rate-limit";
import AppError from "../core/errors/AppError.js";

// GLOBAL fallback limiter (optional reuse)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later",
});

// STRICT limiter (for auth routes)
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many auth attempts, slow down",
});

// UPLOAD limiter (optional)
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Upload limit reached for this window",
});

// NOTE: ========================================================================================================
// NOT USED THOUGH CREATED AS (EXPRESS LIMITER) HAS BEEN USED IN APP.JS FILE (IT IS AN UNUSED FILE IN THE SYSTEM)
