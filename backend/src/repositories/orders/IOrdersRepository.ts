import { IOrder } from "../../domain/entities/order/IOrder";
import { CreateOrderOutputDto } from "../../use-cases/create-order/ICreateOrderUseCase";

export interface IOrdersRepository {
  insert(order: IOrder): Promise<CreateOrderOutputDto>;
  select(userId: string): Promise<IOrder[]>;
}
