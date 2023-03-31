export interface IOrderStatus {
  bought: boolean;
  message: string;
}
export interface IOrderStatusState {
  orderStatus: IOrderStatus;
}
