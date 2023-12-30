import { GetOrdersInput } from "./GetOrdersInput";
import { GetOrdersOutput } from "./GetOrdersOutput";

export interface IGetOrdersUseCase {
  execute(input: GetOrdersInput): Promise<GetOrdersOutput>;
}
