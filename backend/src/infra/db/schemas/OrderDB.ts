import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItemDB } from "./OrderItemDB";
import { OrderFields } from "../../../domain/entities/order/OrderFields";
import { Order } from "../../../domain/entities/order/Order";
import { ApplicationError } from "../../../errors/ApplicationError";

@Entity()
export class OrderDB {
  @PrimaryGeneratedColumn()
  pk?: number;

  @Column({ length: 100 })
  id?: string;

  @Index()
  @Column({ length: 100 })
  userId?: string;

  @Column({ length: 24 })
  createdAt?: string;

  @OneToMany(() => OrderItemDB, (item) => item.order, { cascade: true })
  items?: OrderItemDB[];

  public constructor() {}

  public static build(order: Order): OrderDB {
    return new OrderDB().hydrate(order);
  }

  public hydrate(order: Order): OrderDB {
    const { id, createdAt } = order.getFields().getData();
    this.id = id;
    this.createdAt = createdAt.toISOString();
    return this;
  }

  public getEntity(): Order {
    if (!this.id || !this.createdAt) throw new ApplicationError("missing fields");
    return new Order(OrderFields.rebuild(this.id, new Date(this.createdAt)));
  }
}
