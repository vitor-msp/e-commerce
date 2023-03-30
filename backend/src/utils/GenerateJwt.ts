import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export abstract class GenerateJwt {
  public static execute(payload: any): string {
    dotenv.config();
    if (!process.env.JWT_KEY) throw new Error("jwt key not loaded");
    const jwtKey = process.env.JWT_KEY;
    const fiveHoursInSeconds = 60 * 60 * 5;
    return jwt.sign(payload, jwtKey, { expiresIn: fiveHoursInSeconds });
  }
}
