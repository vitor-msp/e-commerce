import { IOrdersRepository } from "../../repositories/orders/IOrdersRepository";

export type GetOrdersOutputDto = {
  orders: ThinOrder[];
};
export type ThinOrder = {
  id: string;
  date: string;
  items: OrderItem[];
};
type OrderItem = {
  supplierId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
};

export interface IGetOrdersUseCase {
  readonly ordersRepository: IOrdersRepository;
  execute(userId: string): Promise<GetOrdersOutputDto>;
}
