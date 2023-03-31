import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IOrder } from "../../../domain/entities/order/IOrder";
import { OrderItemDB } from "./OrderItemDB";

@Entity()
export class OrderDB implements IOrder {
  @PrimaryGeneratedColumn()
  pk!: number;

  @Column({ length: 100 })
  id!: string;

  @Column({ length: 100 })
  //@ts-ignore
  user!: string;

  @Column({ length: 24 })
  date!: string;

  @OneToMany(() => OrderItemDB, (item) => item.order)
  items!: OrderItemDB[];
}
