import { Request, Response, NextFunction } from "express";
import { Role } from "../../../domain/value-objects/Role";
import { HttpResponses } from "../../HttpResponses";
import { IMiddleware } from "../IMiddleware";

export abstract class AuthorizationMiddleware implements IMiddleware {
  protected constructor(protected readonly authorizedRoles: Role[]) {}

  public handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): void | Response {
    if (!req.query.role)
      return HttpResponses.httpForbidden(res, "missing role");
    const role = Role[req.query.role as keyof typeof Role];

    const authorized = this.authorizedRoles.includes(role);
    if (!authorized)
      return HttpResponses.httpForbidden(
        res,
        "user not have permission to access"
      );

    next();
  }
}
