import { IProduct } from "../products/products.types";

export interface ICurrentProductState {
  data: IProduct;
  showProduct: boolean;
}
