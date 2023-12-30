import { Order } from "../../entities/order/Order";

export interface IOrdersRepository {
  insert(order: Order): Promise<{
    orderId: string;
  }>;
  select(userId: string): Promise<Order[]>;
}
