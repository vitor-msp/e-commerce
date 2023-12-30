import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDB } from "./OrderDB";
import { OrderItemFields } from "../../../domain/entities/order/OrderItemFields";
import { OrderItem } from "../../../domain/entities/order/OrderItem";

@Entity()
export class OrderItemDB {
  @PrimaryGeneratedColumn()
  pk?: number;

  @ManyToOne(() => OrderDB, (order) => order.items)
  order?: OrderDB;

  @Column({ length: 50 })
  supplierId?: string;

  @Column({ length: 50 })
  productId?: string;

  @Column({ length: 100 })
  productName?: string;

  @Column({ type: "decimal", precision: 11, scale: 2 })
  unitPrice?: number;

  @Column()
  quantity?: number;

  constructor() {}

  public static build(fields: OrderItemFields): OrderItemDB {
    return new OrderItemDB().hydrate(fields);
  }

  public hydrate(fields: OrderItemFields): OrderItemDB {
    const { productId, productName, quantity, supplierId, unitPrice } =
      fields.getData();
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.supplierId = supplierId;
    this.unitPrice = unitPrice;
    return this;
  }

  public getEntity(): OrderItem {
    if (
      !this.supplierId ||
      !this.productId ||
      !this.productName ||
      !this.unitPrice ||
      !this.quantity
    )
      throw new Error("missing fields");
    return new OrderItem(
      OrderItemFields.rebuild(
        this.supplierId,
        this.productId,
        this.productName,
        this.unitPrice,
        this.quantity
      )
    );
  }
}
