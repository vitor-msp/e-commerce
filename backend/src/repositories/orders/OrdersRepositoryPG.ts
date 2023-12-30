import { DataSource, Repository } from "typeorm";
import { OrderDB } from "../../infra/db/schemas/OrderDB";
import { OrderItemDB } from "../../infra/db/schemas/OrderItemDB";
import { IOrdersRepository } from "../../domain/contract/repositories/IOrdersRepository";
import { Order } from "../../domain/entities/order/Order";
import { ApplicationError } from "../../errors/ApplicationError";

export class OrdersRepositoryPG implements IOrdersRepository {
  private readonly database: Repository<OrderDB>;

  public constructor(database: DataSource) {
    this.database = database.getRepository(OrderDB);
  }

  public async insert(order: Order): Promise<{
    orderId: string;
  }> {
    const user = order.getUser();
    if (!user) throw new Error("missing user");
    const orderDB = OrderDB.build(order);
    orderDB.userId = user.getId();

    const orderItemsDB: OrderItemDB[] = [];
    order.getItems().map((item) => {
      const orderItemDB = OrderItemDB.build(item);
      orderItemsDB.push(orderItemDB);
    });
    orderDB.items = orderItemsDB;

    const savedOrder = await this.database.save(orderDB);
    if (!savedOrder.id) throw new ApplicationError("missing order id");
    return {
      orderId: savedOrder.id,
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
