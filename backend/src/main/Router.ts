import { Router as ExpressRouter } from "express";
import { IMiddleware } from "../middlewares/IMiddleware";
import { Controllers } from "./Factory";

export class Router {
  private readonly router: ExpressRouter;
  private readonly authenticationMiddleware: IMiddleware;

  public constructor(authenticationMiddleware: IMiddleware) {
    this.router = ExpressRouter();
    this.authenticationMiddleware = authenticationMiddleware;
  }

  public getRoutes(controllers: Controllers): ExpressRouter {
    return this.setRoutes(controllers).router;
  }

  private setRoutes(controllers: Controllers): Router {
    this.router.post("/api/v1/user/signup", (req, res) =>
      controllers.createUser.execute(req, res)
    );
    this.router.post("/api/v1/user/signin", (req, res) =>
      controllers.authUser.execute(req, res)
    );
    this.router.post(
      "/api/v1/order",
      this.authenticationMiddleware.handle,
      (req, res) => controllers.createOrder.execute(req, res)
    );
    this.router.get(
      "/api/v1/order",
      this.authenticationMiddleware.handle,
      (req, res) => controllers.getOrders.execute(req, res)
    );
    return this;
  }
}
