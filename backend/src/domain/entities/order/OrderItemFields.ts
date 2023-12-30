import { OrderItemError } from "../../../errors/OrderItemError";

export class OrderItemFields {
  private constructor(
    private readonly supplierId: string,
    private readonly productId: string,
    private readonly productName: string,
    private readonly unitPrice: number,
    private readonly quantity: number
  ) {}

  public static build(input: any): OrderItemFields {
    if (!input["supplierId"]) throw new OrderItemError("invalid supplierId");
    if (!input["productId"]) throw new OrderItemError("invalid productId");
    if (!input["productName"]) throw new OrderItemError("invalid productName");
    if (!input["unitPrice"] || isNaN(input["unitPrice"]))
      throw new OrderItemError("invalid unitPrice");
    if (!input["quantity"] || isNaN(input["quantity"]))
      throw new OrderItemError("invalid quantity");

    return new OrderItemFields(
      input["supplierId"],
      input["productId"],
      input["productName"],
      input["unitPrice"],
      input["quantity"]
    );
  }

  public static rebuild(
    supplierId: string,
    productId: string,
    productName: string,
    unitPrice: number,
    quantity: number
  ): OrderItemFields {
    return new OrderItemFields(
      supplierId,
      productId,
      productName,
      unitPrice,
      quantity
    );
  }

  public getData() {
    return {
      supplierId: this.supplierId,
      productId: this.productId,
      productName: this.productName,
      unitPrice: this.unitPrice,
      quantity: this.quantity,
    };
  }
}
