export interface IOrderItem {
  readonly supplierId: string;
  readonly productId: string;
  readonly productName: string;
  readonly unitPrice: number;
  readonly quantity: number;
}
