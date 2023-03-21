import { IProduct } from "../../store/products/products.types";

export interface IProductsApi {
  getAllProducts(): IProduct[];
  getProductById(id: string): IProduct;
}
