import express from "express";
import cors from "cors";
import { routes } from "./routes";

export class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(routes);
  }
}
