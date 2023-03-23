import { AppThunk } from "..";
import { suppliers } from "../../factory-suppliers";
import { addProductsAction } from "./products.slice";
import { IProduct } from "./products.types";

export const getProducts = (): AppThunk => async (dispatch) => {
  try {
    const products: IProduct[] = [];
    for (const supplier of suppliers) {
      products.push(...(await supplier.getAllProducts()));
    }
    dispatch(addProductsAction(products));
  } catch (error) {
    alert(error);
  }
};