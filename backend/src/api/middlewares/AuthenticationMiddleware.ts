import { NextFunction, Request, Response } from "express";
import { IMiddleware } from "./IMiddleware";
import { HttpResponses } from "../HttpResponses";
import { JwtValidator } from "../../use-cases/utils/jwt-validator/JwtValidator";

export class AuthenticationMiddleware implements IMiddleware {
  public constructor() {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization;
    if (!bearer) return HttpResponses.httpForbidden(res, "missing jwt");

    const token = bearer.slice(7);
    if (!token) return HttpResponses.httpForbidden(res, "missing jwt");

    try {
      const userId = await new JwtValidator().validate(token);
      req.query.userId = userId;
      next();
    } catch (error: any) {
      return HttpResponses.httpUnauthorized(res);
    }
  }
}
