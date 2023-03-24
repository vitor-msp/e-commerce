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

export const showOrderItem =
  (orderItem: IShowOrderItem): AppThunk =>
  async (dispatch) => {
    try {
      const supplier = suppliers.find(
        (supplier) => supplier.supplierId === orderItem.supplier
      );
      if (!supplier) {
        alert("Item não encontrado.");
        return;
      }
      const product = await supplier.getProductById(orderItem.productId);
      dispatch(updateCurrentProductAction(product));
    } catch (error) {
      alert(error);
    }
  };
