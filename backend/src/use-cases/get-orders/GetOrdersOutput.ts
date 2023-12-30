export type GetOrdersOutput = {
  orders: GetOrdersOrderOutput[];
};

export type GetOrdersOrderOutput = {
  id: string;
  createdAt: string;
  items: GetOrdersOrderItemOutput[];
};

type GetOrdersOrderItemOutput = {
  supplierId: string;
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
};
