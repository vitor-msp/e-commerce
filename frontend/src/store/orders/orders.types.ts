export interface IOrder {
  clientId: string;
  date: string;
  items: IOrderItem[];
}

export interface IOrderItem {
  supplier: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrdersState {
  orders: IOrder[];
}
