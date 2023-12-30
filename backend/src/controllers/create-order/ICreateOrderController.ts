import { Request, Response } from "express";

export interface ICreateOrderController {
  execute(req: Request, res: Response): Promise<Response>;
}
