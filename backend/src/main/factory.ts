import { DataSource } from "typeorm";
import { AuthUserController } from "../controllers/auth-user/AuthUserController";
import { CreateOrderController } from "../controllers/create-order/CreateOrderController";
import { CreateUserController } from "../controllers/create-user/CreateUserController";
import { GetOrdersController } from "../controllers/get-orders/GetOrdersController";
import { UsersDBConfig } from "../infra/db/config/UsersDBConfig";
import { OrdersRepositoryMemory } from "../repositories/orders/OrdersRepositoryMemory";
import { UsersRepositoryPG } from "../repositories/users/UsersRepositoryPG";
import { AuthUserUseCase } from "../use-cases/auth-user/AuthUserUseCase";
import { CreateOrderUseCase } from "../use-cases/create-order/CreateOrderUseCase";
import { CreateUserUseCase } from "../use-cases/create-user/CreateUserUseCase";
import { GetOrdersUseCase } from "../use-cases/get-orders/GetOrdersUseCase";
import { ValidateOrder } from "../validators/ValidateOrder";

export const database = new DataSource(UsersDBConfig.getOptions());

const usersRepositoryPG = new UsersRepositoryPG(database);
export const createUserController = new CreateUserController(
  new CreateUserUseCase(usersRepositoryPG)
);
export const authUserController = new AuthUserController(
  new AuthUserUseCase(usersRepositoryPG)
);

const ordersRepositoryMemory = new OrdersRepositoryMemory([]);
export const createOrderController = new CreateOrderController(
  new CreateOrderUseCase(ordersRepositoryMemory, usersRepositoryPG),
  new ValidateOrder()
);
export const getOrdersController = new GetOrdersController(
  new GetOrdersUseCase(ordersRepositoryMemory)
);
