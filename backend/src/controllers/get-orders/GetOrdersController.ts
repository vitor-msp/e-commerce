import { Request, Response } from "express";
import { GetOrdersError } from "../../errors/GetOrdersError";
import { IGetOrdersUseCase } from "../../use-cases/get-orders/IGetOrdersUseCase";
import { IGetOrdersController } from "./IGetOrdersController";

export class GetOrdersController implements IGetOrdersController {
  constructor(readonly getOrdersUseCase: IGetOrdersUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.query.userId?.toString();
      if (!userId) throw new GetOrdersError("missing userId");
      const output = await this.getOrdersUseCase.execute(userId);
      return res.status(200).json(output);
    } catch (error: any) {
      if (error instanceof GetOrdersError)
        return res.status(400).json({ errorMessage: error.message });
      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
