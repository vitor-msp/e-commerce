import { IOrdersRepository } from "../../repositories/orders/IOrdersRepository";
import { GetOrdersOutputDto, IGetOrdersUseCase } from "./IGetOrdersUseCase";

export class GetOrdersUseCase implements IGetOrdersUseCase {
  constructor(readonly ordersRepository: IOrdersRepository) {}

  async execute(userId: string): Promise<GetOrdersOutputDto> {
    return await this.ordersRepository.select(userId);
  }
}
