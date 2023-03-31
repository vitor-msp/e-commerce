import { IOrder } from "../../domain/entities/order/IOrder";
import { CreateOrderOutputDto } from "../../use-cases/create-order/ICreateOrderUseCase";
import { GetOrdersOutputDto } from "../../use-cases/get-orders/IGetOrdersUseCase";

export interface IOrdersRepository {
  insert(order: IOrder): Promise<CreateOrderOutputDto>;
  select(userId: string): Promise<GetOrdersOutputDto>;
}
