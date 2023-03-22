import { IProductsApi } from "./services/api/IProductsApi";
import { Supplier1 } from "./services/api/Supplier1";
import { Supplier2 } from "./services/api/Supplier2";

export const suppliers: IProductsApi[] = [new Supplier1(), new Supplier2()];
