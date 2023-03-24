import axios, { AxiosInstance } from "axios";
import { IOrder } from "../../../store/orders/orders.types";

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

  async postOrder(order: IOrder): Promise<OrderReturn> {
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

  async getOrders(): Promise<IOrder[]> {
    let error = true;
    const res: IOrder[] = await this.api
      .get("/")
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    //@ts-ignore
    if (error) throw new Error(res);
    return res;
  }
}
