import * as uuid from "uuid";
import { OrderItem } from "./OrderItem";
import { IOrder, OrderProps } from "./IOrder";
import { User } from "../user/User";
import { OrderError } from "../../../errors/OrderError";

export class Order implements IOrder {
  readonly id: string;
  readonly user: User;
  readonly date: string;
  readonly items: OrderItem[];

  constructor(orderInput: OrderProps) {
    orderInput.id = orderInput.id?.trim();
    this.id =
      orderInput.id && orderInput.id.localeCompare("") !== 0
        ? orderInput.id
        : uuid.v4();
    this.user = orderInput.user;
    if (!orderInput.date) throw new OrderError("invalid date");
    this.date = orderInput.date;
    this.items = [];
  }

  getData(): IOrder {
    return {
      id: this.id,
      user: this.user,
      date: this.date,
      items: this.items,
    };
  }
}
