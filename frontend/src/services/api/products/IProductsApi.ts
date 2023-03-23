import { IProduct } from "../../../store/products/products.types";

export interface IProductsApi {
  getAllProducts(): Promise<IProduct[]>;
  getProductById(id: string): Promise<IProduct>;
}
