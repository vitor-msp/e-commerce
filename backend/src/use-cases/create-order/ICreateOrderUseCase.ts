import { OrderFields } from "../../domain/entities/order/OrderFields";
import { OrderItemFields } from "../../domain/entities/order/OrderItemFields";
import { CreateOrderError } from "../../errors/CreateOrderError";

export class CreateOrderInput {
  private userId: string;
  private items: CreateOrderOrderItemInput[];

  public constructor(input: any) {
    if (!input["userId"]) throw new CreateOrderError("missing userId");
    this.userId = input["userId"];
    if (!input["items"]) throw new CreateOrderError("invalid order");
    const items: any[] = input["items"];
    if (items.length === 0) throw new CreateOrderError("invalid order");
    this.items = items.map((item) => new CreateOrderOrderItemInput(item));
  }

  public getFields(): OrderFields {
    return OrderFields.build();
  }

  public getUserId(): string {
    return this.userId;
  }

  public getItems(): OrderItemFields[] {
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
    if (
      !input["supplierId"] ||
      !input["productId"] ||
      !input["productName"] ||
      !input["unitPrice"] ||
      !input["quantity"]
    )
      throw new CreateOrderError("invalid order");

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

export type CreateOrderOutput = {
  orderId: string;
};

export interface ICreateOrderUseCase {
  execute(input: CreateOrderInput): Promise<CreateOrderOutput>;
}
