import { IProduct } from "../../../store/products/products.types";

export interface IProductsApi {
  readonly supplierId: string;
  getAllProducts(): Promise<IProduct[]>;
  getProductById(id: string): Promise<IProduct>;
}
