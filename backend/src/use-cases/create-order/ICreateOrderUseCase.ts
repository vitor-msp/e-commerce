import { CreateOrderInput } from "./CreateOrderInput";
import { CreateOrderOutput } from "./CreateOrderOutput";

export interface ICreateOrderUseCase {
  execute(input: CreateOrderInput): Promise<CreateOrderOutput>;
}
