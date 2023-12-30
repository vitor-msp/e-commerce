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

  public static build(fields: OrderFields): OrderDB {
    return new OrderDB().hydrate(fields);
  }

  public hydrate(fields: OrderFields): OrderDB {
    const { id, createdAt } = fields.getData();
    this.id = id;
    this.createdAt = createdAt.toISOString();
    return this;
  }

  public getEntity(): Order {
    if (!this.id || !this.createdAt) throw new Error("missing fields");
    return new Order(OrderFields.rebuild(this.id, new Date(this.createdAt)));
  }
}
