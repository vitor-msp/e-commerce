import { IUser } from "../user/IUser";
import { User } from "../user/User";
import { IOrderItem } from "./IOrderItem";

export type OrderProps = {
  id?: string;
  user: User;
  date: string;
};

export interface IOrder {
  readonly id: string;
  readonly user: IUser;
  readonly date: string;
  readonly items: IOrderItem[];
}
