import { IOrdersRepository } from "../../repositories/orders/IOrdersRepository";
import {
  GetOrdersOutputDto,
  IGetOrdersUseCase,
  ThinOrder,
} from "./IGetOrdersUseCase";

export class GetOrdersUseCase implements IGetOrdersUseCase {
  constructor(readonly ordersRepository: IOrdersRepository) {}

  async execute(userId: string): Promise<GetOrdersOutputDto> {
    const savedOrders = await this.ordersRepository.select(userId);
    const orders: ThinOrder[] = savedOrders.map(({ id, date, items }) => {
      return {
        id,
        date,
        items,
      };
    });
    return {
      orders,
    };
  }
}
