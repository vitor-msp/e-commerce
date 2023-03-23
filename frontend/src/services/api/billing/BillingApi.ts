import axios, { AxiosInstance } from "axios";

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
    let error = true;
    const res: OrderReturn = await this.api
      .post("/", order)
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    return { orderId: "1", status: "pendente" };
    //@ts-ignore
    if (error) throw new Error(res);
    return res;
  }

  async getOrders(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}
