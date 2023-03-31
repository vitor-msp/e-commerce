import { AppThunk } from "..";
import { billingApi } from "../../factory";
import { boughtAlert } from "../order-status/order-status.slice";
import { LOCAL_STORAGE_JWT_KEY_NAME } from "../user/user.types";
import { addOrdersAction } from "./orders.slice";
import { IOrder } from "./orders.types";

export const postOrder =
  (order: IOrder): AppThunk =>
  async (dispatch) => {
    try {
      const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY_NAME);
      if (!jwt)
        throw new Error(
          "Usuário não autenticado. Gentileza fazer o login novamente!"
        );
      const orderReturn = await billingApi.postOrder(order, jwt);
      const message = `Pedido realizado com sucesso!\n Id do pedido: ${orderReturn.orderId}`;
      dispatch(
        boughtAlert({
          bought: true,
          message,
        })
      );
    } catch (error) {
      alert(error);
    }
  };

export const getOrders = (): AppThunk => async (dispatch) => {
  try {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY_NAME);
    if (!jwt)
      throw new Error(
        "Usuário não autenticado. Gentileza fazer o login novamente!"
      );
    const orders = await billingApi.getOrders(jwt);
    dispatch(addOrdersAction(orders));
  } catch (error) {
    alert(error);
  }
};
