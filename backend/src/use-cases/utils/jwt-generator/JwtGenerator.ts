import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApplicationError } from "../../../errors/ApplicationError";
import { IJwtGenerator } from "./IJwtGenerator";

export class JwtGenerator implements IJwtGenerator {
  public generate(payload: any, expiresIn: string | number): string {
    dotenv.config();
    if (!process.env.JWT_KEY) throw new ApplicationError("jwt key not loaded");
    const jwtKey = process.env.JWT_KEY;
    return jwt.sign(payload, jwtKey, { expiresIn });
  }
}
