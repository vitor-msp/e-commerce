import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export abstract class VerifyAuth {
  public static verify(req: Request, res: Response, next: NextFunction) {
    dotenv.config();
    const bearer = req.headers.authorization;
    if (!bearer) return res.status(403).json({ errorMessage: "missing jwt" });
    const token = bearer.slice(7);
    if (!token || token.length === 0)
      return res.status(403).json({ errorMessage: "missing jwt" });
    if (!process.env.JWT_KEY)
      return res.status(500).json({ errorMessage: "jwt key not loaded" });
    jwt.verify(token, process.env.JWT_KEY!, (err, decoded) => {
      if (err) return res.status(401).send();
      // @ts-ignore
      req.query.userId = decoded.userId;
      next();
    });
  }
}
