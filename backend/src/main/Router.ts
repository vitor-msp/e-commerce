import { Router as ExpressRouter } from "express";
import { IMiddleware } from "../api/middlewares/IMiddleware";
import { Controllers } from "./Factory";
import passport from "passport";

export const GITHUB_SSO_CALLBACK = "/api/v1/users/signin/github/callback";

export class Router {
  private readonly router: ExpressRouter;
  private readonly authenticationMiddleware: IMiddleware;
  private readonly customerGuard: IMiddleware;
  private readonly administratorGuard: IMiddleware;

  public constructor(
    authenticationMiddleware: IMiddleware,
    customerGuard: IMiddleware,
    administratorGuard: IMiddleware
  ) {
    this.router = ExpressRouter();
    this.authenticationMiddleware = authenticationMiddleware;
    this.customerGuard = customerGuard;
    this.administratorGuard = administratorGuard;
  }

  public getRoutes(controllers: Controllers): ExpressRouter {
    return this.setRoutes(controllers).router;
  }

  private setRoutes(controllers: Controllers): Router {
    this.router.post("/api/v1/users/signup", (req, res) =>
      controllers.createUser.execute(req, res)
    );
    this.router.post(
      "/api/v1/users/admin/signup",
      this.authenticationMiddleware.handle,
      (req, res, next) => this.administratorGuard.handle(req, res, next),
      (req, res) => controllers.createUserAdmin.execute(req, res)
    );
    this.router.post("/api/v1/users/signin", (req, res) =>
      controllers.authUser.execute(req, res)
    );
    this.router.get(
      "/api/v1/users/signin/github",
      passport.authenticate("github", { scope: ["user:email"] })
    );
    this.router.get(GITHUB_SSO_CALLBACK, (req, res, next) => {
      passport.authenticate("github", (_err: any, profile: any) => {
        req.body = {
          githubId: profile._json.id,
          email: profile._json.email,
        };
        controllers.authUserSSO.execute(req, res);
      })(req, res, next);
    });
    this.router.post("/api/v1/users/refresh-token", (req, res) =>
      controllers.refreshToken.execute(req, res)
    );
    this.router.post("/api/v1/users/logout", (req, res) =>
      controllers.logout.execute(req, res)
    );

    this.router.post(
      "/api/v1/orders",
      this.authenticationMiddleware.handle,
      (req, res, next) => this.customerGuard.handle(req, res, next),
      (req, res) => controllers.createOrder.execute(req, res)
    );
    this.router.get(
      "/api/v1/orders",
      this.authenticationMiddleware.handle,
      (req, res, next) => this.customerGuard.handle(req, res, next),
      (req, res) => controllers.getOrders.execute(req, res)
    );
    return this;
  }
}
