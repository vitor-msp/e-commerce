import { GetOrdersOutput } from "./GetOrdersOutput";

export interface IGetOrdersUseCase {
  execute(userId: string): Promise<GetOrdersOutput>;
}
