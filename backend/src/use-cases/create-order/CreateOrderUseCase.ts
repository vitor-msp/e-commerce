import { Order } from "../../domain/entities/order/Order";
import { OrderItem } from "../../domain/entities/order/OrderItem";
import { IOrdersRepository } from "../../domain/contract/repositories/IOrdersRepository";
import { IUsersRepository } from "../../domain/contract/repositories/IUsersRepository";
import { ICreateOrderUseCase } from "./ICreateOrderUseCase";
import { ApplicationError } from "../../errors/ApplicationError";
import { CreateOrderInput } from "./CreateOrderInput";
import { CreateOrderOutput } from "./CreateOrderOutput";

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly ordersRepository: IOrdersRepository,
    private readonly usersRepository: IUsersRepository
  ) {}

  async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
    const user = await this.usersRepository.selectById(input.getUserId());
    if (!user) throw new ApplicationError("user not found");
    const order = new Order(input.getFields());
    order.setUser(user);
    input.getItemFields().forEach((item) => {
      order.addItem(new OrderItem(item));
    });
    return await this.ordersRepository.insert(order);
  }
}
