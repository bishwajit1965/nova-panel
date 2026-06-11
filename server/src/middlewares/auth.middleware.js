import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import User from "../modules/users/user.model.js";
import AppError from "../core/errors/AppError.js";

export const authMiddleware = async (req, res, next) => {
  try {
    //✅ 1. Get token from header
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies.accessToken;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : cookieToken;

    console.log("Token from header or cookie:", token);

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    //✅ 2. Verify token
    let decoded;

    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(new AppError("TOKEN_EXPIRED", 401));
      }

      if (error.name === "JsonWebTokenError") {
        return next(new AppError("INVALID_TOKEN", 401));
      }

      return next(new AppError("AUTH_FAILED", 401));
    }

    //✅ 3. Find user
    const user = await User.findById(decoded.id)
      .populate("plan")
      .populate({ path: "roles", populate: { path: "permissions" } });

    console.log("User populated", user);

    if (!user) {
      throw new AppError("User not found.", 404);
    }
    if (!user.isActive) {
      throw new AppError("Account is inactive/suspended.", 403);
    }

    //✅ 4. Attach user to request
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
