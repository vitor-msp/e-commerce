import { OrderItemFields } from "./OrderItemFields";

export class OrderItem {
  private readonly fields: OrderItemFields;

  constructor(fields: OrderItemFields) {
    this.fields = fields;
  }

  getFields(): OrderItemFields {
    return this.fields;
  }
}
