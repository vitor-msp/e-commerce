import jwt from "jsonwebtoken";

export abstract class GenerateJwt {
  public static execute(payload: any): string {
    const jwtKey = process.env.JWT_KEY ?? (Math.random() * 1000).toString();
    const fiveHoursInSeconds = 60 * 60 * 5;
    return jwt.sign(payload, jwtKey, { expiresIn: fiveHoursInSeconds });
  }
}
