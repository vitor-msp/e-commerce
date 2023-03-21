import { AppThunk } from "..";
import { suppliers } from "../../factory-suppliers";
import { getProductsAction } from "./products.slice";
import { IProduct } from "./products.types";

export const getProducts = (): AppThunk => async (dispatch) => {
  try {
    const products: IProduct[] = [];
    suppliers.forEach((supplier) => {
      products.push(...supplier.getAllProducts());
    });
    dispatch(getProductsAction(products));
  } catch (error) {
    alert(error);
  }
};
