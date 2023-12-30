import { DomainError } from "../../../errors/DomainError";

export class OrderItemFields {
  private constructor(
    private readonly supplierId: string,
    private readonly productId: string,
    private readonly productName: string,
    private readonly unitPrice: number,
    private readonly quantity: number
  ) {}

  public static build(input: any): OrderItemFields {
    if (!input["supplierId"]) throw new DomainError("invalid supplierId");
    if (!input["productId"]) throw new DomainError("invalid productId");
    if (!input["productName"]) throw new DomainError("invalid productName");
    if (!input["unitPrice"] || isNaN(input["unitPrice"]))
      throw new DomainError("invalid unitPrice");
    if (!input["quantity"] || isNaN(input["quantity"]))
      throw new DomainError("invalid quantity");

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
