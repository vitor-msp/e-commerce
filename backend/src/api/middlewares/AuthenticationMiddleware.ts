import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IMiddleware } from "./IMiddleware";
import { HttpResponses } from "../HttpResponses";

export class AuthenticationMiddleware implements IMiddleware {
  public constructor() {}

  public handle(req: Request, res: Response, next: NextFunction) {
    dotenv.config();
    if (!process.env.JWT_KEY)
      return HttpResponses.httpInternalError(res, "jwt key not loaded");
    const bearer = req.headers.authorization;
    if (!bearer) return HttpResponses.httpForbidden(res, "missing jwt");
    const token = bearer.slice(7);
    if (!token) return HttpResponses.httpForbidden(res, "missing jwt");

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) return HttpResponses.httpUnauthorized(res);
      // @ts-ignore
      if (!decoded.userId)
        return HttpResponses.httpBadRequest(res, "missing userId");
      // @ts-ignore
      req.query.userId = decoded.userId;
      next();
    });
  }
}
