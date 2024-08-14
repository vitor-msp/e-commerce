import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "..";
import { billingApi } from "../../factory";
import { UnauthorizedError } from "../../services/api/UnauthorizedError";
import { boughtAlert } from "../order-status/order-status.slice";
import { LOCAL_STORAGE_JWT_KEY_NAME } from "../user/user.types";
import { addOrdersAction } from "./orders.slice";
import { IOrder } from "./orders.types";
import { Command, performRequest } from "./performRequest";

export const postOrder =
  (order: IOrder, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    const command = new Command(
      async () => await processPostOrder(order, dispatch)
    );
    await performRequest(command, navigate, dispatch);
  };

const processPostOrder = async (order: IOrder, dispatch: any) => {
  const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY_NAME);
  if (!jwt) throw new UnauthorizedError();
  const orderReturn = await billingApi.postOrder(order, jwt);
  const message = `Pedido realizado com sucesso!\n Id do pedido: ${orderReturn.orderId}`;
  dispatch(
    boughtAlert({
      bought: true,
      message,
    })
  );
};

export const getOrders =
  (navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    const command = new Command(async () => await processGetOrders(dispatch));
    await performRequest(command, navigate, dispatch);
  };

const processGetOrders = async (dispatch: any) => {
  const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY_NAME);
  if (!jwt) throw new UnauthorizedError();
  const orders = await billingApi.getOrders(jwt);
  dispatch(addOrdersAction(orders));
};
