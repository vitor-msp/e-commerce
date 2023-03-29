import { CreateOrderError } from "../errors/CreateOrderError";
import { CreateOrderInputDto } from "../use-cases/create-order/ICreateOrderUseCase";
import { IValidateOrder } from "./IValidateOrder";

export class ValidateOrder implements IValidateOrder {
  validate(order: CreateOrderInputDto): void {
    if (!order.date || !order.items || order.items.length === 0)
      throw new CreateOrderError("invalid order");
    order.items.forEach((item) => {
      if (
        !item.supplierId ||
        !item.productId ||
        !item.productName ||
        !item.unitPrice ||
        !item.quantity
      )
        throw new CreateOrderError("invalid order item");
    });
  }
}
