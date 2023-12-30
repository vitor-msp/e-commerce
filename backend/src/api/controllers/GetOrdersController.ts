import { Request, Response } from "express";
import { IGetOrdersUseCase } from "../../use-cases/get-orders/IGetOrdersUseCase";
import { GetOrdersInput } from "../../use-cases/get-orders/GetOrdersInput";
import { IController } from "./IController";

export class GetOrdersController implements IController {
  constructor(private readonly getOrdersUseCase: IGetOrdersUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new GetOrdersInput({ userId: req.query["userId"] });
      const output = await this.getOrdersUseCase.execute(input);
      return res.status(200).json(output);
    } catch (error: any) {
      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
