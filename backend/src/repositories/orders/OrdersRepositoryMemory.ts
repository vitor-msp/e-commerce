import { IOrder } from "../../domain/entities/order/IOrder";
import { User } from "../../domain/entities/user/User";
import { IOrdersRepository } from "./IOrdersRepository";

export const DEFAULT_DATE = "2023-03-30T00:50:33.638Z";

export class OrdersRepositoryMemory implements IOrdersRepository {
  constructor(private readonly orders: IOrder[]) {
    this.orders = [
      {
        id: "99",
        user: new User({ id: "99", email: "99@teste.com", password: "" }),
        date: new Date().toISOString(),
        items: [
          {
            supplierId: "supplierId",
            productId: "productId",
            productName: "productName",
            unitPrice: 10.64,
            quantity: 13,
          },
        ],
      },
      {
        id: "100",
        user: new User({ id: "100", email: "100@teste.com", password: "" }),
        date: DEFAULT_DATE,
        items: [
          {
            supplierId: "1",
            productId: "1",
            productName: "productName",
            unitPrice: 10.5,
            quantity: 10,
          },
          {
            supplierId: "2",
            productId: "2",
            productName: "productName",
            unitPrice: 10.5,
            quantity: 10,
          },
        ],
      },
      {
        id: "101",
        user: new User({ id: "100", email: "100@teste.com", password: "" }),
        date: DEFAULT_DATE,
        items: [
          {
            supplierId: "3",
            productId: "3",
            productName: "productName",
            unitPrice: 10.5,
            quantity: 10,
          },
        ],
      },
    ];
  }

  async insert(order: IOrder): Promise<string> {
    this.orders.push(order);
    return "order-1";
  }

  async select(userId: string): Promise<IOrder[]> {
    return this.orders.filter((order) => order.user.id === userId);
  }
}
