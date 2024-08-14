export interface IOrder {
  id?: string;
  createdAt: string;
  items: IOrderItem[];
}

export interface IOrderItem {
  supplier: string;
  productId: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export type IShowOrderItem = {
  supplier: string;
  productId: string;
};

export interface IOrdersState {
  orders: IOrder[];
}
