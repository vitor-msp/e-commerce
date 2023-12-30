import express from "express";
import cors from "cors";
import { Factory } from "./Factory";
import { Router } from "./Router";
import { DBConnector } from "../infra/db/config/DBConnector";
import { DBOptions } from "../infra/db/config/DBOptions";
import { DataSource } from "typeorm";
import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";

export class App {
  public readonly express: express.Application;
  private dataSource: DataSource;
  private dbOptions: any;

  public constructor() {
    this.dbOptions = DBOptions.getOptions();
    this.dataSource = new DataSource(this.dbOptions);
    const factory = new Factory(this.dataSource);
    const router = new Router(new AuthenticationMiddleware());

    this.express = express();
    this.express.use(cors());
    this.express.use(express.json());

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
}
