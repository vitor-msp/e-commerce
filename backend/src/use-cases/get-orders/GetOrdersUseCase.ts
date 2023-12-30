import { IOrdersRepository } from "../../domain/contract/repositories/IOrdersRepository";
import { GetOrdersOutput, IGetOrdersUseCase } from "./IGetOrdersUseCase";

export class GetOrdersUseCase implements IGetOrdersUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(userId: string): Promise<GetOrdersOutput> {
    const orders = await this.ordersRepository.select(userId);
    return {
      orders: orders.map((order) => ({
        id: order.getFields().getData().id,
        createdAt: order.getFields().getData().createdAt.toISOString(),
        items: order.getItems().map((item) => item.getFields().getData()),
      })),
    };
  }
}
