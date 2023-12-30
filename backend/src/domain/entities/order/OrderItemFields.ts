export class OrderItemFields {
  private constructor(
    private readonly supplierId: string,
    private readonly productId: string,
    private readonly productName: string,
    private readonly unitPrice: number,
    private readonly quantity: number
  ) {}

  public static build(input: any): OrderItemFields {
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
