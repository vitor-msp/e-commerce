import { Request, Response } from "express";
import { CreateOrderError } from "../../errors/CreateOrderError";
import { OrderError } from "../../errors/OrderError";
import { OrderItemError } from "../../errors/OrderItemError";
import {
  CreateOrderInputDto,
  ICreateOrderUseCase,
} from "../../use-cases/create-order/ICreateOrderUseCase";
import { IValidateOrder } from "../../validators/IValidateOrder";
import { ICreateOrderController } from "./ICreateOrderController";

export class CreateOrderController implements ICreateOrderController {
  constructor(
    readonly createOrderUseCase: ICreateOrderUseCase,
    readonly validateOrder: IValidateOrder
  ) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const input: CreateOrderInputDto = req.body;
      this.validateOrder.validate(input);
      input.userId = req.query.userId!.toString();
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
