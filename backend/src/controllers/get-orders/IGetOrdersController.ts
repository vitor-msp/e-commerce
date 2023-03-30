import { Request, Response } from "express";
import { IGetOrdersUseCase } from "../../use-cases/get-orders/IGetOrdersUseCase";

export interface IGetOrdersController {
  readonly getOrdersUseCase: IGetOrdersUseCase;
  execute(req: Request, res: Response): Promise<Response>;
}
