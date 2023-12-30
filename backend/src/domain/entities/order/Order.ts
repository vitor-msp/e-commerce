import { OrderItem } from "./OrderItem";
import { User } from "../user/User";
import { OrderFields } from "./OrderFields";

export class Order {
  private readonly fields: OrderFields;
  private user?: User;
  private readonly items: OrderItem[] = [];

  constructor(fields: OrderFields) {
    this.fields = fields;
  }

  public getFields(): OrderFields {
    return this.fields;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getUser(): User | undefined {
    return this.user;
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getId(): string {
    return this.fields.getData().id;
  }

  public getCreatedAt(): Date {
    return this.fields.getData().createdAt;
  }
}
