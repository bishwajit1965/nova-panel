import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./core/errors/GlobalErrorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

// Cookie parser
app.use(cookieParser());

//🔐 1. Security Middlewares
app.use(helmet());

app.use(
  cors({
    origin: "*", // later replace with frontend URL
    credentials: true,
  }),
);

//⚡ 2. Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🚦 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit per IP
});

app.use(limiter);

//  🧭 4. API Routes
app.use("/api", routes);

// 404 (must be before error handler)
app.use(notFoundHandler);

// global error handler (LAST)
app.use(globalErrorHandler);

export default app;
