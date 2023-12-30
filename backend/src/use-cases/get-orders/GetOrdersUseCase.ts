import { IOrdersRepository } from "../../domain/contract/repositories/IOrdersRepository";
import { GetOrdersInput } from "./GetOrdersInput";
import { GetOrdersOutput } from "./GetOrdersOutput";
import { IGetOrdersUseCase } from "./IGetOrdersUseCase";

export class GetOrdersUseCase implements IGetOrdersUseCase {
  constructor(private readonly ordersRepository: IOrdersRepository) {}

  async execute(input: GetOrdersInput): Promise<GetOrdersOutput> {
    const orders = await this.ordersRepository.select(input.getUserId());
    return {
      orders: orders.map((order) => ({
        id: order.getId(),
        createdAt: order.getCreatedAt().toISOString(),
        items: order.getItems().map((item) => item.getFields().getData()),
      })),
    };
  }
}
