import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IOrderItem } from "../../../domain/entities/order/IOrderItem";
import { OrderDB } from "./OrderDB";

@Entity()
export class OrderItemDB implements IOrderItem {
  @PrimaryGeneratedColumn()
  pk!: number;

  @ManyToOne(() => OrderDB, (order) => order.items)
  order!: OrderDB;

  @Column({ length: 50 })
  supplierId!: string;

  @Column({ length: 50 })
  productId!: string;

  @Column({ length: 100 })
  productName!: string;

  @Column({ type: "decimal", precision: 11, scale: 2 })
  unitPrice!: number;

  @Column()
  quantity!: number;
}
