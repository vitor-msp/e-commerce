import { DataSource } from "typeorm";
import { AuthUserController } from "../api/controllers/AuthUserController";
import { CreateOrderController } from "../api/controllers/CreateOrderController";
import { CreateUserController } from "../api/controllers/CreateUserController";
import { GetOrdersController } from "../api/controllers/GetOrdersController";
import { IController } from "../api/controllers/IController";
import { OrdersRepositoryPG } from "../repositories/orders/OrdersRepositoryPG";
import { UsersRepositoryPG } from "../repositories/users/UsersRepositoryPG";
import { AuthUserUseCase } from "../use-cases/auth-user/AuthUserUseCase";
import { CreateOrderUseCase } from "../use-cases/create-order/CreateOrderUseCase";
import { CreateUserUseCase } from "../use-cases/create-user/CreateUserUseCase";
import { GetOrdersUseCase } from "../use-cases/get-orders/GetOrdersUseCase";
import { PasswordEncryptor } from "../use-cases/utils/password-encryptor/PasswordEncryptor";
import { IPasswordEncryptor } from "../use-cases/utils/password-encryptor/IPasswordEncryptor";
import { JwtGenerator } from "../use-cases/utils/jwt-generator/JwtGenerator";
import { RefreshTokenController } from "../api/controllers/RefreshTokenController";
import { RefreshTokenUseCase } from "../use-cases/refresh-token/RefreshTokenUseCase";
import { JwtValidator } from "../use-cases/utils/jwt-validator/JwtValidator";
import { LogutController } from "../api/controllers/LogutController";
import { LogoutUseCase } from "../use-cases/logout/LogoutUseCase";

export type Controllers = {
  createUser: IController;
  authUser: IController;
  refreshToken: IController;
  logout: IController;
  createOrder: IController;
  getOrders: IController;
};

export class Factory {
  private createUserController!: CreateUserController;
  private authUserController!: AuthUserController;
  private refreshTokenController!: RefreshTokenController;
  private logoutController!: LogutController;
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
    const jwtValidator = new JwtValidator();
    const jwtGenerator = new JwtGenerator();
    this.authUserController = new AuthUserController(
      new AuthUserUseCase(usersRepositoryPG, passwordEncryptor, jwtGenerator)
    );
    this.refreshTokenController = new RefreshTokenController(
      new RefreshTokenUseCase(usersRepositoryPG, jwtValidator, jwtGenerator)
    );
    this.logoutController = new LogutController(
      new LogoutUseCase(usersRepositoryPG, jwtValidator)
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
      refreshToken: this.refreshTokenController,
      logout: this.logoutController,
      createOrder: this.createOrderController,
      getOrders: this.getOrdersController,
    };
  }
}
