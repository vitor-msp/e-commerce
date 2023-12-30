import { DataSource } from "typeorm";
import { AuthUserController } from "../controllers/AuthUserController";
import { CreateOrderController } from "../controllers/CreateOrderController";
import { CreateUserController } from "../controllers/CreateUserController";
import { GetOrdersController } from "../controllers/GetOrdersController";
import { OrdersRepositoryPG } from "../repositories/orders/OrdersRepositoryPG";
import { UsersRepositoryPG } from "../repositories/users/UsersRepositoryPG";
import { AuthUserUseCase } from "../use-cases/auth-user/AuthUserUseCase";
import { CreateOrderUseCase } from "../use-cases/create-order/CreateOrderUseCase";
import { CreateUserUseCase } from "../use-cases/create-user/CreateUserUseCase";
import { GetOrdersUseCase } from "../use-cases/get-orders/GetOrdersUseCase";
import { PasswordEncryptor } from "../utils/password-encryptor/PasswordEncryptor";
import { IPasswordEncryptor } from "../utils/password-encryptor/IPasswordEncryptor";
import { JwtGenerator } from "../utils/jwt-generator/JwtGenerator";
import { IController } from "../controllers/IController";

export type Controllers = {
  createUser: IController;
  authUser: IController;
  createOrder: IController;
  getOrders: IController;
};

export class Factory {
  private createUserController!: CreateUserController;
  private authUserController!: AuthUserController;
  private createOrderController!: CreateOrderController;
  private getOrdersController!: GetOrdersController;

  public constructor(dataSource: DataSource) {
    this.injectDependencies(dataSource);
  }

  private injectDependencies(dataSource: DataSource) {
    const passwordEncryptor: IPasswordEncryptor = new PasswordEncryptor();
    const usersRepositoryPG = new UsersRepositoryPG(dataSource);
    this.createUserController = new CreateUserController(
      new CreateUserUseCase(usersRepositoryPG, passwordEncryptor)
    );
    this.authUserController = new AuthUserController(
      new AuthUserUseCase(
        usersRepositoryPG,
        passwordEncryptor,
        new JwtGenerator()
      )
    );
    const ordersRepositoryPG = new OrdersRepositoryPG(dataSource);
    this.createOrderController = new CreateOrderController(
      new CreateOrderUseCase(ordersRepositoryPG, usersRepositoryPG)
    );
    this.getOrdersController = new GetOrdersController(
      new GetOrdersUseCase(ordersRepositoryPG)
    );
  }

  public getControllers(): Controllers {
    return {
      createUser: this.createUserController,
      authUser: this.authUserController,
      createOrder: this.createOrderController,
      getOrders: this.getOrdersController,
    };
  }
}
