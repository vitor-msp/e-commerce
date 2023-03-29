import { Request, Response } from "express";
import { ICreateOrderUseCase } from "../../use-cases/create-order/ICreateOrderUseCase";
import { IValidateOrder } from "../../validators/IValidateOrder";

export interface ICreateOrderController {
  readonly createOrderUseCase: ICreateOrderUseCase;
  readonly validateOrder: IValidateOrder;
  execute(req: Request, res: Response): Promise<Response>;
}
