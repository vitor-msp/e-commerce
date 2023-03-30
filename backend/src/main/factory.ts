import { AuthUserController } from "../controllers/auth-user/AuthUserController";
import { CreateOrderController } from "../controllers/create-order/CreateOrderController";
import { CreateUserController } from "../controllers/create-user/CreateUserController";
import { GetOrdersController } from "../controllers/get-orders/GetOrdersController";
import { OrdersRepositoryMemory } from "../repositories/orders/OrdersRepositoryMemory";
import { UsersRepositoryMemory } from "../repositories/users/UsersRepositoryMemory";
import { AuthUserUseCase } from "../use-cases/auth-user/AuthUserUseCase";
import { CreateOrderUseCase } from "../use-cases/create-order/CreateOrderUseCase";
import { CreateUserUseCase } from "../use-cases/create-user/CreateUserUseCase";
import { GetOrdersUseCase } from "../use-cases/get-orders/GetOrdersUseCase";
import { ValidateOrder } from "../validators/ValidateOrder";

const usersRepositoryMemory = new UsersRepositoryMemory([]);
export const createUserController = new CreateUserController(
  new CreateUserUseCase(usersRepositoryMemory)
);
export const authUserController = new AuthUserController(
  new AuthUserUseCase(usersRepositoryMemory)
);

const ordersRepositoryMemory = new OrdersRepositoryMemory([]);
export const createOrderController = new CreateOrderController(
  new CreateOrderUseCase(ordersRepositoryMemory, usersRepositoryMemory),
  new ValidateOrder()
);
export const getOrdersController = new GetOrdersController(
  new GetOrdersUseCase(ordersRepositoryMemory)
);
