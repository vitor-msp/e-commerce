import { DataSource } from "typeorm";
import { IOrder } from "../../domain/entities/order/IOrder";
import { IOrdersRepository } from "./IOrdersRepository";

export class OrdersRepositoryPG implements IOrdersRepository {
  //   private readonly database: Repository<OrderDB>;

  constructor(database: DataSource) {
    // this.database = database.getRepository(OrderDB);
  }

  insert(order: IOrder): Promise<string> {
    throw new Error("Method not implemented.");
  }

  select(userId: string): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }
}
