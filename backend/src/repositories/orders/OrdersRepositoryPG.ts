import { DataSource, Repository } from "typeorm";
import { IOrder } from "../../domain/entities/order/IOrder";
import { OrderDB } from "../../infra/db/schemas/OrderDB";
import { OrderItemDB } from "../../infra/db/schemas/OrderItemDB";
import { CreateOrderOutputDto } from "../../use-cases/create-order/ICreateOrderUseCase";
import { IOrdersRepository } from "./IOrdersRepository";

export class OrdersRepositoryPG implements IOrdersRepository {
  private readonly database: Repository<OrderDB>;

  constructor(database: DataSource) {
    this.database = database.getRepository(OrderDB);
  }

  async insert(order: IOrder): Promise<CreateOrderOutputDto> {
    const { id, date, user, items } = order;
    const orderDB = new OrderDB();
    orderDB.id = id;
    orderDB.date = date;
    orderDB.user = user.id;
    const orderItemsDB: OrderItemDB[] = [];
    items.forEach(
      ({ productId, productName, quantity, supplierId, unitPrice }) => {
        const orderItemDB = new OrderItemDB();
        orderItemDB.productId = productId;
        orderItemDB.productName = productName;
        orderItemDB.quantity = quantity;
        orderItemDB.supplierId = supplierId;
        orderItemDB.unitPrice = unitPrice;
        orderItemsDB.push(orderItemDB);
      }
    );
    orderDB.items = orderItemsDB;
    const savedOrder = await this.database.save(orderDB);
    return {
      orderId: savedOrder.id,
    };
  }

  select(userId: string): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }
}
