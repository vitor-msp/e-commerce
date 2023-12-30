import { DataSource, Repository } from "typeorm";
import { OrderDB } from "../../infra/db/schemas/OrderDB";
import { OrderItemDB } from "../../infra/db/schemas/OrderItemDB";
import { IOrdersRepository } from "../../domain/contract/repositories/IOrdersRepository";
import { Order } from "../../domain/entities/order/Order";

export class OrdersRepositoryPG implements IOrdersRepository {
  private readonly database: Repository<OrderDB>;

  public constructor(database: DataSource) {
    this.database = database.getRepository(OrderDB);
  }

  public async insert(order: Order): Promise<{
    orderId: string;
  }> {
    const orderDB = OrderDB.build(order.getFields());
    const user = order.getUser();
    if (!user) throw new Error("missing user");
    orderDB.userId = user.getFields().getData().id;

    const orderItemsDB: OrderItemDB[] = [];
    order.getItems().map((item) => {
      const orderItemDB = OrderItemDB.build(item.getFields());
      orderItemsDB.push(orderItemDB);
    });
    orderDB.items = orderItemsDB;

    const savedOrder = await this.database.save(orderDB);
    return {
      orderId: savedOrder.id!,
    };
  }

  public async select(userId: string): Promise<Order[]> {
    const ordersDB = await this.database.find({
      where: { userId },
      relations: { items: true },
    });
    return ordersDB.map((orderDB) => {
      const order = orderDB.getEntity();
      orderDB.items?.forEach((item) => {
        order.addItem(item.getEntity());
      });
      return order;
    });
  }
}
