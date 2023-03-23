import axios, { AxiosInstance, AxiosResponse } from "axios";
import { isHttpStatusSuccess } from "../../../utils/api-utils";

export type Order = {
  clientId: string;
  date: string;
  items: OrderItem[];
};

export type OrderItem = {
  supplier: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
};

type OrderReturn = {
  orderId: string;
  status: string;
};

export class BillingApi {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BILLING_API_URL,
    });
  }

  async postOrder(order: Order): Promise<OrderReturn> {
    const res: AxiosResponse<OrderReturn> = await this.api
      .post("/", order)
      .then((res) => res)
      .catch((error) => error.response);
    //@ts-ignore
    if (!isHttpStatusSuccess(res.status)) throw new Error(res.data);
    return res.data;
  }

  async getOrders(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
