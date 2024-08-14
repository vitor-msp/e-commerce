import dotenv from "dotenv";
dotenv.config();

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
export const REFRESH_JWT_EXPIRES_IN =
  process.env.REFRESH_JWT_EXPIRES_IN || "7d";
