import { Request, Response } from "express";
import { CreateOrderError } from "../../errors/CreateOrderError";
import { OrderError } from "../../errors/OrderError";
import { OrderItemError } from "../../errors/OrderItemError";
import {
  CreateOrderInput,
  ICreateOrderUseCase,
} from "../../use-cases/create-order/ICreateOrderUseCase";
import { ICreateOrderController } from "./ICreateOrderController";

export class CreateOrderController implements ICreateOrderController {
  constructor(private readonly createOrderUseCase: ICreateOrderUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.query["userId"];
      if (!userId) throw new Error("missing userId");
      req.body["userId"] = userId.toString();
      const input = new CreateOrderInput(req.body);
      const output = await this.createOrderUseCase.execute(input);
      return res.status(201).json(output);
    } catch (error: any) {
      if (
        error instanceof OrderError ||
        error instanceof OrderItemError ||
        error instanceof CreateOrderError
      )
        return res.status(400).json({ errorMessage: error.message });
      return res.status(500).json({ errorMessage: error.message });
    }
  }
}
