import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { UsersDBConfig } from "../infra/db/config/DBConfig";

export class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(routes);
  }

  async run(): Promise<App> {
    await UsersDBConfig.connect();
    return this;
  }
}
