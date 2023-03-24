import { AppThunk } from "..";
import { billingApi, suppliers } from "../../factory";
import { updateCurrentProductAction } from "../current-product/current-product.slice";
import { addOrdersAction } from "./orders.slice";

export const getOrders = (): AppThunk => async (dispatch) => {
  try {
    const orders = await billingApi.getOrders();
    dispatch(addOrdersAction(orders));
  } catch (error) {
    alert(error);
  }
};

export type IShowOrderItem = {
  supplier: string;
  productId: string;
};
