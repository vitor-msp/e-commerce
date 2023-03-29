import { IOrderItem } from "../../domain/entities/order/IOrderItem";
import { IOrdersRepository } from "../../repositories/orders/IOrdersRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";

export type CreateOrderInputDto = {
  userId: string;
  date: string;
  items: IOrderItem[]
};

export type CreateOrderOutputDto = {
  orderId: string;
};

export interface ICreateOrderUseCase {
  readonly ordersRepository: IOrdersRepository;
  readonly usersRepository: IUsersRepository;
  execute(input: CreateOrderInputDto): Promise<CreateOrderOutputDto>;
}
