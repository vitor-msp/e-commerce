import { AppThunk } from "..";
import { billingApi } from "../../factory";
import { addOrdersAction } from "./orders.slice";

export const getOrders = (): AppThunk => async (dispatch) => {
  try {
    const orders = await billingApi.getOrders();
    dispatch(addOrdersAction(orders));
  } catch (error) {
    alert(error);
  }
};
