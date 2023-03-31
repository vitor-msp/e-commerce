import { Order } from "../../domain/entities/order/Order";
import { OrderItem } from "../../domain/entities/order/OrderItem";
import { User } from "../../domain/entities/user/User";
import { CreateOrderError } from "../../errors/CreateOrderError";
import { IOrdersRepository } from "../../repositories/orders/IOrdersRepository";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import {
  CreateOrderInputDto,
  CreateOrderOutputDto,
  ICreateOrderUseCase,
} from "./ICreateOrderUseCase";

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    readonly ordersRepository: IOrdersRepository,
    readonly usersRepository: IUsersRepository
  ) {}

  async execute(input: CreateOrderInputDto): Promise<CreateOrderOutputDto> {
    const { date, items, userId } = input;
    if (items.length === 0) throw new CreateOrderError("none item");
    const savedUserData = await this.usersRepository.selectById(userId);
    if (!savedUserData) throw new CreateOrderError("user not found");
    const { id, email } = savedUserData;
    const order = new Order({ date, user: new User({ id, email }) });
    items.forEach(
      ({ productId, productName, quantity, supplierId, unitPrice }) => {
        order.addItem(
          new OrderItem({
            productId,
            productName,
            quantity,
            supplierId,
            unitPrice,
          })
        );
      }
    );
    return await this.ordersRepository.insert(order);
  }
}
