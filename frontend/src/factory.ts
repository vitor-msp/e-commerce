import { BillingApi } from "./services/api/billing/BillingApi";
import { IProductsApi } from "./services/api/products/IProductsApi";
import { Supplier1 } from "./services/api/products/Supplier1";
import { Supplier2 } from "./services/api/products/Supplier2";
import { UserApi } from "./services/api/user/UserApi";

export const suppliers: IProductsApi[] = [new Supplier1(), new Supplier2()];

export const billingApi = new BillingApi();

export const userApi = new UserApi();