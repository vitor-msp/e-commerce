import { Order } from "../../domain/entities/order/Order";
import { OrderItem } from "../../domain/entities/order/OrderItem";
import { CreateOrderError } from "../../errors/CreateOrderError";
import { IOrdersRepository } from "../../domain/contract/repositories/IOrdersRepository";
import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import {
  CreateOrderInput,
  CreateOrderOutput,
  ICreateOrderUseCase,
} from "./ICreateOrderUseCase";

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const user = await this.usersRepository.selectById(input.getUserId());
    if (!user) throw new CreateOrderError("user not found");
    const order = new Order(input.getFields());
    order.setUser(user);
    input.getItems().forEach((item) => {
      order.addItem(new OrderItem(item));
    });
    return await this.ordersRepository.insert(order);
  }
}
