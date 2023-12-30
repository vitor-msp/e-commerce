import { DataSource } from "typeorm";
import { AuthUserController } from "../controllers/auth-user/AuthUserController";
import { CreateOrderController } from "../controllers/create-order/CreateOrderController";
import { CreateUserController } from "../controllers/create-user/CreateUserController";
import { GetOrdersController } from "../controllers/get-orders/GetOrdersController";
import { DBConfig } from "../infra/db/config/DBConfig";
import { OrdersRepositoryPG } from "../repositories/orders/OrdersRepositoryPG";
import { UsersRepositoryPG } from "../repositories/users/UsersRepositoryPG";
import { AuthUserUseCase } from "../use-cases/auth-user/AuthUserUseCase";
import { CreateOrderUseCase } from "../use-cases/create-order/CreateOrderUseCase";
import { CreateUserUseCase } from "../use-cases/create-user/CreateUserUseCase";
import { GetOrdersUseCase } from "../use-cases/get-orders/GetOrdersUseCase";

export const database = new DataSource(DBConfig.getOptions());

const usersRepositoryPG = new UsersRepositoryPG(database);
export const createUserController = new CreateUserController(
  new CreateUserUseCase(usersRepositoryPG)
);
export const authUserController = new AuthUserController(
  new AuthUserUseCase(usersRepositoryPG)
);

const ordersRepositoryPG = new OrdersRepositoryPG(database);
export const createOrderController = new CreateOrderController(
  new CreateOrderUseCase(ordersRepositoryPG, usersRepositoryPG)
);
export const getOrdersController = new GetOrdersController(
  new GetOrdersUseCase(ordersRepositoryPG)
);
