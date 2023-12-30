import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApplicationError } from "../../../errors/ApplicationError";
import { IJwtGenerator } from "./IJwtGenerator";

export class JwtGenerator implements IJwtGenerator {
  public generate(payload: any): string {
    dotenv.config();
    if (!process.env.JWT_KEY) throw new ApplicationError("jwt key not loaded");
    const jwtKey = process.env.JWT_KEY;
    const fiveHoursInSeconds = 60 * 60 * 5;
    return jwt.sign(payload, jwtKey, { expiresIn: fiveHoursInSeconds });
  }
}
