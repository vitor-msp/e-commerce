import { AppThunk } from "..";
import { billingApi } from "../../factory";
import { LOCAL_STORAGE_JWT_KEY_NAME } from "../user/user.types";
import { addOrdersAction } from "./orders.slice";
import { IOrder } from "./orders.types";

export const postOrder =
  (order: IOrder): AppThunk =>
  async () => {
    try {
      console.log(order);
      const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY_NAME);
      if (!jwt)
        throw new Error(
          "Usuário não autenticado. Gentileza fazer o login novamente!"
        );
      const orderReturn = await billingApi.postOrder(order, jwt);
      console.log(orderReturn);
    } catch (error) {
      alert(error);
    }
  };

export const getOrders = (): AppThunk => async (dispatch) => {
  try {
    const orders = await billingApi.getOrders();
    dispatch(addOrdersAction(orders));
  } catch (error) {
    alert(error);
  }
};
