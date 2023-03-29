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
    if (!itemInput.productId) throw new OrderItemError("invalid productId");
    this.productId = itemInput.productId;
    if (!itemInput.productName) throw new OrderItemError("invalid productName");
    this.productName = itemInput.productName;
    if (!itemInput.unitPrice || isNaN(itemInput.unitPrice))
      throw new OrderItemError("invalid unitPrice");
    this.unitPrice = itemInput.unitPrice;
    if (!itemInput.quantity || isNaN(itemInput.quantity))
      throw new OrderItemError("invalid quantity");
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
