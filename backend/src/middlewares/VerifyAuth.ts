import { NextFunction, Request, Response } from "express";

export abstract class VerifyAuth {
  public static verify(req: Request, res: Response, next: NextFunction): void {
    req.query.userId = "1";
    next();
  }
}
