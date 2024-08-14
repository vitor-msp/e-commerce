import { Request, Response } from "express";
import { ICreateOrderUseCase } from "../../use-cases/create-order/ICreateOrderUseCase";
import { CreateOrderInput } from "../../use-cases/create-order/CreateOrderInput";
import { IController } from "./IController";
import { StatusCode } from "../utils/StatusCode";

export class CreateOrderController implements IController {
  constructor(private readonly createOrderUseCase: ICreateOrderUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input = new CreateOrderInput({
        ...req.body,
        userId: req.query["userId"],
      });
      const output = await this.createOrderUseCase.execute(input);
      return res.status(201).json(output);
    } catch (error: any) {
      const statusCode = StatusCode.fromError(error);
      return res.status(statusCode).json({ errorMessage: error.message });
    }
  }
}
