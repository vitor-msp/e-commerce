import { CreateOrderInputDto } from "../use-cases/create-order/ICreateOrderUseCase";

export interface IValidateOrder {
  validate(order: CreateOrderInputDto): void;
}
