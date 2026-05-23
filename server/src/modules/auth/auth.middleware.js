// import jwt from "jsonwebtoken";
// import User from "../modules/auth/auth.model.js";
// import AppError from "../core/errors/AppError.js";

// export const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       throw new AppError("Unauthorized", 401);
//     }

//     const token = authHeader.split(" ")[1];

//     let decoded;

//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       throw new AppError("Invalid token", 401);
//     }

//     const user = await User.findById(decoded.id)
//       .populate("plan")
//       .populate({ path: "roles", populate: { path: "permissions" } });

//     if (!user) {
//       throw new AppError("User not found", 404);
//     }

//     req.user = user;

//     next();
//   } catch (err) {
//     next(err);
//   }
// };
