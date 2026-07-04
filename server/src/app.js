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
import { registerAuditListeners } from "./modules/auditLogs/audit.listeners.js";

const app = express();

// Cookie parser
app.use(cookieParser());

//🔐 1. Security Middlewares
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "*", // later replace with frontend URL
    credentials: true,
  }),
);

// 🚦 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10000, // limit per IP
});

app.use(limiter);

//⚡ 2. Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

registerAuditListeners();

//  🧭 4. API Routes
app.use("/api/v1", routes);

// 404 (must be before error handler)
app.use(notFoundHandler);

// global error handler (LAST)
app.use(globalErrorHandler);

export default app;
