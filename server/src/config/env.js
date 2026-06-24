import dotenv from "dotenv";

dotenv.config();

// required env validation
const requiredEnv = [
  "MONGO_DB_URI",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CLIENT_URL",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const config = {
  PORT: process.env.PORT || 5000,

  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME || "project_core",
  MONGO_URI: process.env.MONGO_DB_URI,

  // MONGO_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rlnqmfs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  // NODE MAILER
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  CLIENT_URL: process.env.CLIENT_URL,
};
