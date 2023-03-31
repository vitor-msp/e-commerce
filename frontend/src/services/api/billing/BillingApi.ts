import axios, { AxiosInstance } from "axios";
import { IOrder } from "../../../store/orders/orders.types";
import { injectJwt } from "../../../utils/InjectJwt";

type CreateOrderReq = {
  date: string;
  items: CreateOrderItemReq[];
};
type CreateOrderItemReq = {
  supplierId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
};
type CreateOrderRes = {
  orderId: string;
};

export class BillingApi {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_ORDER_API_URL,
    });
  }

  async postOrder(order: IOrder, jwt: string): Promise<CreateOrderRes> {
    const { date, items } = order;
    const reqBody: CreateOrderReq = {
      date,
      items: items.map(({ name, productId, quantity, supplier, unitPrice }) => {
        return {
          productId,
          quantity,
          unitPrice,
          supplierId: supplier,
          productName: name,
        };
      }),
    };
    let error = true;
    const res: CreateOrderRes = await this.api
      .post<CreateOrderRes, any, CreateOrderReq>("/", reqBody, {
        headers: injectJwt(jwt),
      })
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    //@ts-ignore
    if (error) throw new Error(res);
    return { orderId: res.orderId };
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
