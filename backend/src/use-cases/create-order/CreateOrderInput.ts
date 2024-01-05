import { OrderFields } from "../../domain/entities/order/OrderFields";
import { OrderItemFields } from "../../domain/entities/order/OrderItemFields";
import { ApplicationError } from "../../errors/ApplicationError";

export class CreateOrderInput {
  private userId: string;
  private items: CreateOrderOrderItemInput[];

  public constructor(input: any) {
    if (!input["userId"]) throw new ApplicationError("missing user id");
    if (!input["items"]) throw new ApplicationError("invalid order");
    const items: any[] = input["items"];
    if (items.length === 0) throw new ApplicationError("invalid order");

    this.userId = input["userId"];
    this.items = items.map((item) => new CreateOrderOrderItemInput(item));
  }

  public getUserId(): string {
    return this.userId;
  }

  public getFields(): OrderFields {
    return OrderFields.build();
  }

  public getItemFields(): OrderItemFields[] {
    return this.items.map((item) => item.getFields());
  }
}

export class CreateOrderOrderItemInput {
  private supplierId: string;
  private productId: string;
  private productName: string;
  private unitPrice: number;
  private quantity: number;

  public constructor(input: any) {
    if (!input["supplierId"]) throw new ApplicationError("invalid order");
    if (!input["productId"]) throw new ApplicationError("invalid order");
    if (!input["productName"])
      throw new ApplicationError("invalid order");
    if (!input["unitPrice"] || isNaN(input["unitPrice"]))
      throw new ApplicationError("invalid order");
    if (!input["quantity"] || isNaN(input["quantity"]))
      throw new ApplicationError("invalid order");

    this.supplierId = input["supplierId"];
    this.productId = input["productId"];
    this.productName = input["productName"];
    this.unitPrice = input["unitPrice"];
    this.quantity = input["quantity"];
  }

  public getFields(): OrderItemFields {
    return OrderItemFields.build(this);
  }
}
