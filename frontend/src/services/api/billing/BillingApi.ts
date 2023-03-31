import axios, { AxiosInstance } from "axios";
import { IOrder, IOrderItem } from "../../../store/orders/orders.types";
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

type GetOrdersRes = {
  orders: ThinOrdersRes[];
};
type ThinOrdersRes = {
  id: string;
  date: string;
  items: OrderItemRes[];
};
type OrderItemRes = {
  supplierId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
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

  async getOrders(jwt: string): Promise<IOrder[]> {
    let error = true;
    const res: GetOrdersRes = await this.api
      .get("/", {
        headers: injectJwt(jwt),
      })
      .then((res) => {
        error = false;
        return res.data;
      })
      .catch((error) => error.response?.data ?? error.message);
    //@ts-ignore
    if (error) throw new Error(res);
    return res.orders.map(({ date, id, items }) => {
      return {
        date,
        id,
        items: items.map<IOrderItem>(
          ({ productId, productName, quantity, supplierId, unitPrice }) => {
            return {
              name: productName,
              productId,
              quantity,
              unitPrice,
              supplier: supplierId,
            };
          }
        ),
      };
    });
  }
}
