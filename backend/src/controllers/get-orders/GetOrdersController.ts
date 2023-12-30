import { Request, Response } from "express";
import { IGetOrdersUseCase } from "../../use-cases/get-orders/IGetOrdersUseCase";
import { IGetOrdersController } from "./IGetOrdersController";

export class GetOrdersController implements IGetOrdersController {
  constructor(private readonly getOrdersUseCase: IGetOrdersUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.query["userId"];
      if (!userId) throw new Error("missing userId");
      const output = await this.getOrdersUseCase.execute(userId.toString());
      return res.status(200).json(output);
    } catch (error: any) {
      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
