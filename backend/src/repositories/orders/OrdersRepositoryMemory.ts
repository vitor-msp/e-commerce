import { IOrder } from "../../domain/entities/order/IOrder";
import { IOrdersRepository } from "./IOrdersRepository";

export class OrdersRepositoryMemory implements IOrdersRepository {
  constructor(private readonly orders: IOrder[]) {
    this.orders = [];
  }

  async insert(order: IOrder): Promise<string> {
    this.orders.push(order);
    return "order-1";
  }
}
