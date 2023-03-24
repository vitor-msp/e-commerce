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
    const date = new Date();
    date.setFullYear(2022);
    date.setMonth(11);
    return [
      {
        clientId: "1",
        date: new Date().toISOString(),
        items: [
          {
            supplier: "1",
            productId: "11",
            name: "teste",
            quantity: 1,
            unitPrice: 5.27,
          },
          {
            supplier: "2",
            productId: "21",
            name: "teste 2",
            quantity: 1,
            unitPrice: 5.27,
          },
        ],
      },
      {
        clientId: "1",
        date: date.toISOString(),
        items: [
          {
            supplier: "1",
            productId: "11",
            name: "teste",
            quantity: 1,
            unitPrice: 5.27,
          },
          {
            supplier: "2",
            productId: "21",
            name: "teste 2",
            quantity: 1,
            unitPrice: 5.27,
          },
        ],
      },
    ];
    //@ts-ignore
    // if (error) throw new Error(res);
    // return res;
  }
}
