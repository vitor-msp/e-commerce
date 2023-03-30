import { Request, Response } from "express";
import { IGetOrdersUseCase } from "../../use-cases/get-orders/IGetOrdersUseCase";
import { IGetOrdersController } from "./IGetOrdersController";

export class GetOrdersController implements IGetOrdersController {
  constructor(readonly getOrdersUseCase: IGetOrdersUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.query.userId!.toString();
      const output = await this.getOrdersUseCase.execute(userId);
      return res.status(200).json(output);
    } catch (error: any) {
      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
