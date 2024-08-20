import express from "express";
import cors from "cors";
import passport, { DoneCallback } from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Factory } from "./Factory";
import { GITHUB_SSO_CALLBACK, Router } from "./Router";
import { DBConnector } from "../infra/db/config/DBConnector";
import { DBOptions } from "../infra/db/config/DBOptions";
import { DataSource } from "typeorm";
import { AuthenticationMiddleware } from "../api/middlewares/AuthenticationMiddleware";
import { CustomerGuard } from "../api/middlewares/authorization/CustomerGuard";
import { AdministratorGuard } from "../api/middlewares/authorization/AdministratorGuard";

export class App {
  public readonly express: express.Application;
  private dataSource: DataSource;
  private dbOptions: any;

  public constructor() {
    this.dbOptions = DBOptions.getOptions();
    this.dataSource = new DataSource(this.dbOptions);
    const factory = new Factory(this.dataSource);
    const router = new Router(
      new AuthenticationMiddleware(),
      new CustomerGuard(),
      new AdministratorGuard()
    );

    this.express = express();
    this.express.use(cors());
    this.express.use(express.json());
    this.configureSSO();

    const controllers = factory.getControllers();
    const routes = router.getRoutes(controllers);
    this.express.use(routes);
  }

  public async run(): Promise<App> {
    await new DBConnector(this.dataSource, this.dbOptions).connect();
    return this;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }

  private configureSSO(): void {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    if (!clientID || !clientSecret) {
      throw new Error("missing CLIENT_ID and/or CLIENT_SECRET");
    }
    passport.use(
      new GitHubStrategy(
        {
          clientID,
          clientSecret,
          callbackURL: GITHUB_SSO_CALLBACK,
        },
        (
          _accessToken: string,
          _refreshToken: string,
          profile: any,
          done: DoneCallback
        ) => {
          done(null, profile);
        }
      )
    );
  }
}
