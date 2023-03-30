import { IOrder } from "../../domain/entities/order/IOrder";

export interface IOrdersRepository {
  insert(order: IOrder): Promise<string>;
  select(userId: string): Promise<IOrder[]>;
}
