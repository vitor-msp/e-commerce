import { Request, Response } from "express";

export interface IGetOrdersController {
  execute(req: Request, res: Response): Promise<Response>;
}
