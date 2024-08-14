import jwtLib from "jsonwebtoken";
import dotenv from "dotenv";
import { IJwtValidator } from "./IJwtValidator";
import { AuthUserError } from "../../../errors/AuthUserError";

export class JwtValidator implements IJwtValidator {
  public constructor() {}

  public async getContent(
    jwt: string,
    ifValid: boolean = true
  ): Promise<string> {
    dotenv.config();
    const jwtKey = process.env.JWT_KEY;
    if (!jwtKey) return Promise.reject(new AuthUserError("jwt key not loaded"));

    return new Promise((resolve, reject) => {
      jwtLib.verify(
        jwt,
        jwtKey,
        { ignoreExpiration: !ifValid },
        (err, decoded) => {
          if (ifValid && err) return reject(new AuthUserError("invalid jwt"));

          const userId = (decoded as jwtLib.JwtPayload).userId;
          if (!userId)
            return reject(new AuthUserError("jwt not contains user info"));

          return resolve(userId);
        }
      );
    });
  }
}
