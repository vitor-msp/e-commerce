import { OrderItemError } from "../../../errors/OrderItemError";
import { IOrderItem } from "./IOrderItem";

export class OrderItem implements IOrderItem {
  readonly supplierId: string;
  readonly productId: string;
  readonly productName: string;
  readonly unitPrice: number;
  readonly quantity: number;

  constructor(itemInput: IOrderItem) {
    if (!itemInput.supplierId) throw new OrderItemError("invalid supplierId");
    this.supplierId = itemInput.supplierId;
    this.productId = itemInput.productId;
    this.productName = itemInput.productName;
    this.unitPrice = itemInput.unitPrice;
    this.quantity = itemInput.quantity;
  }

  getData(): IOrderItem {
    return {
      supplierId: this.supplierId,
      productId: this.productId,
      productName: this.productName,
      unitPrice: this.unitPrice,
      quantity: this.quantity,
    };
  }
}
